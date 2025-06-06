import { User, UserBase } from "@/features/users/interfaces/user.interface";

export interface Login {
  email: string;
  password: string;
}

export interface Register extends UserBase {
  password: string;
}

export interface Auth {
  user: User;
  token: string;
  exp: number;
}

export interface AuthResponse {
  token: string;
}
