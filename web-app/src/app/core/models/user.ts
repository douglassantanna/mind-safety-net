export interface User {
  fullName: string;
  active: boolean;
  role: Role;
  email: string;
  id: number;
}

export interface ViewUser {
  fullName: string;
  active: boolean;
  role: Role;
  email: string;
  id: number;
}

export interface NewUser {
  fullName: string;
  email: string;
  role: Role;
  active: boolean;
  id?: number;
}

export enum Role {
  Admin = 1,
  Manager,
  Patient
}
