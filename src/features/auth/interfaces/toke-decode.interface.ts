import { UserRole } from "@/features/users/interfaces/user.interface";

export interface TokenDecode {
  jti: string;
  role: UserRole;
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
