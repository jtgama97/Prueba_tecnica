import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'students', 
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: '**', redirectTo: 'students' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
