import { Routes } from '@angular/router';
import { CreateComponent } from './pages/users/create/create.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { PatientFormComponent } from './pages/patients/patient-form/patient-form.component';
import { CreateQuestionComponent } from './pages/questions/create-question/create-question.component';
import { ListQuestionsComponent } from './pages/questions/list-questions/list-questions.component';
import { ListPatientsComponent } from './pages/patients/list-patients/list-patients.component';
import { PatientProfileComponent } from './pages/patients/patient-profile/patient-profile.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: PatientFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/list', canActivate: [authGuard, roleGuard], data: { roles: ['admin', 'manager'] }, component: ListUsersComponent },
  { path: 'questions/create', canActivate: [authGuard, roleGuard], data: { roles: ['admin', 'manager'] }, component: CreateQuestionComponent },
  { path: 'questions/list', canActivate: [authGuard, roleGuard], data: { roles: ['admin', 'manager'] }, component: ListQuestionsComponent },
  { path: 'patients/list', canActivate: [authGuard, roleGuard], data: { roles: ['admin', 'manager'] }, component: ListPatientsComponent },
  { path: 'patients/profile/:id', canActivate: [authGuard, roleGuard], data: { roles: ['admin', 'manager'] }, component: PatientProfileComponent },
];
