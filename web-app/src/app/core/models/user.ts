export interface User {
  name: string;
  role: Role;
  email: string;
  id: number;
}

export interface NewUser {
  name: string;
  role: Role;
  email: string;
  password: string;
}

export enum Role {
  Admin = 1,
  Manager
}
