import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService, Student } from '../../core/services/student.service';
import { AuthService } from '../../core/services/auth.service';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.sass'
})
export class StudentListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'id_card', 'grade', 'test_status', 'actions'];
  dataSource = new MatTableDataSource<Student>();
  loading = false;
  Math = Math;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filters = {
    test_status: '',
    grade: ''
  };

  testStatuses = [
    { value: '', label: 'Todos' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en_progreso', label: 'En Progreso' },
    { value: 'completada', label: 'Completada' },
    { value: 'reprobada', label: 'Reprobada' }
  ];

  grades = [
    { value: '', label: 'Todos' },
    { value: '10A', label: '10A' },
    { value: '10B', label: '10B' },
    { value: '11A', label: '11A' },
    { value: '11B', label: '11B' }
  ];

  constructor(
    private studentService: StudentService,
    public authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  ngAfterViewInit(): void {
    // Asignar el paginator y sort después de que la vista se inicialice
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Carga los estudiantes desde el backend con los filtros aplicados.
   */
  loadStudents(): void {
    this.loading = true;
    this.studentService.getStudents(this.filters).subscribe({
      next: (data) => {
        // Asignar los datos al datasource
        this.dataSource.data = data;

        // IMPORTANTE: Reasignar el paginador después de actualizar los datos
        // Esto asegura que MatPaginator reconozca la cantidad total de registros
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
          this.paginator.firstPage();
        }

        // Reasignar el sort
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }

        // Forzar la detección de cambios
        this.cdr.detectChanges();

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar estudiantes:', err);
        this.snackBar.open('Error al cargar estudiantes', 'Cerrar', { duration: 3000 });
      }
    });
  }

  /**
   * Aplica los filtros seleccionados y recarga la tabla.
   */
  applyFilters(): void {
    // Reiniciar el índice de página
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    // Cargar estudiantes con los filtros actualizados
    this.loadStudents();
  }

  /**
   * Limpia todos los filtros y recarga la tabla.
   */
  clearFilters(): void {
    this.filters = { test_status: '', grade: '' };
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.loadStudents();
  }

  /**
   * Abre el diálogo para crear o editar un estudiante.
   */
  openFormDialog(student?: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '500px',
      data: student || null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadStudents();
      }
    });
  }

  /**
   * Elimina un estudiante después de confirmar.
   */
  deleteStudent(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.snackBar.open('Estudiante eliminado', 'Cerrar', { duration: 3000 });
          this.loadStudents();
        },
        error: (err) => {
          console.error('Error al eliminar estudiante:', err);
          this.snackBar.open('Error al eliminar estudiante', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Retorna el color del chip según el estado de la prueba.
   */
  getStatusColor(status: string): string {
    switch (status) {
      case 'pendiente':
        return 'warn';
      case 'en_progreso':
        return 'accent';
      case 'completada':
        return 'primary';
      case 'reprobada':
        return 'warn';
      default:
        return '';
    }
  }
}
