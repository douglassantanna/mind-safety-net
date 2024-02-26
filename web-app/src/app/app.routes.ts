import { Routes } from '@angular/router';
import { CreateComponent } from './pages/users/create/create.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { LoginComponent } from './pages/authentication/login/login.component';

export const routes: Routes = [
  { path: '*', pathMatch: 'full', component: ListUsersComponent },
  { path: 'users/list', component: ListUsersComponent },
  { path: 'users/create', component: CreateComponent },
  { path: 'users/:id/edit', component: CreateComponent },
  { path: 'login', component: LoginComponent },
];
