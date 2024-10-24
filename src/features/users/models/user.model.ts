export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRoleModel;
}

export enum UserRoleModel {
  Admin = "admin",
  Customer = "customer",
  Employee = "employee",
}

export type UserCreate = Omit<UserModel, "id">;

export type UserUpdate = Partial<UserModel>;
