import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService, Student } from '../../core/services/student.service';

@Component({
  selector: 'app-student-form',
  standalone: false,
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.sass'
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  loading = false;

  grades = ['10A', '10B', '11A', '11B'];
  testStatuses = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en_progreso', label: 'En Progreso' },
    { value: 'completada', label: 'Completada' },
    { value: 'reprobada', label: 'Reprobada' }
  ];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student | null
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      id_card: ['', [Validators.required, Validators.minLength(5)]],
      grade: ['', Validators.required],
      test_status: ['pendiente', Validators.required]
    });

    if (data) {
      this.isEditMode = true;
      this.studentForm.patchValue(data);
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.loading = true;
      const formData = this.studentForm.value;

      if (this.isEditMode && this.data?.id) {
        this.studentService.updateStudent(this.data.id, formData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Estudiante actualizado', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.loading = false;
            this.snackBar.open('Error al actualizar estudiante', 'Cerrar', { duration: 3000 });
          }
        });
      } else {
        this.studentService.createStudent(formData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Estudiante creado', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.loading = false;
            this.snackBar.open('Error al crear estudiante', 'Cerrar', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
