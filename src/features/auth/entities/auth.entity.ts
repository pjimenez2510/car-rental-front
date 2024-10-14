import {
  UserEntity,
  UserRoleEntity,
} from "@/features/users/entities/user.entity";

export interface TokenEntity {
  jti: string;
  role: UserRoleEntity;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  sub: string;
  scp: string;
  aud: null;
  iat: number;
  exp: number;
}

export interface AuthEntity {
  token: string;
}

export interface LoginEntity {
  email: string;
  password: string;
}

export interface RegisterEntity extends Omit<UserEntity, "id" | "role"> {
  password: string;
}
