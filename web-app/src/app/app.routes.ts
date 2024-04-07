import { Routes } from '@angular/router';
import { CreateComponent } from './pages/users/create/create.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { PatientFormComponent } from './pages/patients/patient-form/patient-form.component';
import { CreateQuestionComponent } from './pages/questions/create-question/create-question.component';
import { ListQuestionsComponent } from './pages/questions/list-questions/list-questions.component';
import { ListPatientsComponent } from './pages/patients/list-patients/list-patients.component';
import { PatientProfileComponent } from './pages/patients/patient-profile/patient-profile.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: PatientFormComponent },
  { path: 'users/list', component: ListUsersComponent },
  { path: 'users/create', component: CreateComponent },
  { path: 'users/:id/edit', component: CreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questions/create', component: CreateQuestionComponent },
  { path: 'questions/list', component: ListQuestionsComponent },
  { path: 'patients/list', component: ListPatientsComponent },
  { path: 'patients/profile/:id', component: PatientProfileComponent },
];
