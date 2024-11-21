export interface UserBase {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface User extends UserBase {
  id: string;
  role: UserRole;
}

export enum UserRole {
  Admin = "admin",
  Customer = "customer",
  Employee = "employee",
  USER = "USER",
}

export type UserCreate = UserBase;

export type UserUpdate = Partial<UserBase>;
