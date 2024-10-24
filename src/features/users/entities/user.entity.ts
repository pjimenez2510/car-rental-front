export interface UserEntity {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: UserRoleEntity;
}

export type UserEntityCreate = Omit<UserEntity, "id">;

export type UserEntityUpdate = Partial<UserEntity>;

export enum UserRoleEntity {
  Admin = "admin",
  Customer = "customer",
  Employee = "employee",
}
