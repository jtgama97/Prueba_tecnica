import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  name: string;
  id_card: string;
  grade: string;
  test_status: 'pendiente' | 'en_progreso' | 'completada' | 'reprobada';
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/students';

  constructor(private http: HttpClient) {}

  getStudents(filters?: any): Observable<Student[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.test_status) params = params.set('test_status', filters.test_status);
      if (filters.grade) params = params.set('grade', filters.grade);
    }
    return this.http.get<Student[]>(this.apiUrl, { params });
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
