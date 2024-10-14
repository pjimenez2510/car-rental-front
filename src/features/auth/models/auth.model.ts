import { UserModel } from "@/features/users/models/user.model";

export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel extends Omit<UserModel, "id" | "role"> {
  password: string;
}

export interface AuthModel {
  user: UserModel;
  token: string;
  exp: number;
}
