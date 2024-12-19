import { Register } from "@/features/auth/interfaces/auth.interface";
import { User } from "@/features/users/interfaces/user.interface";

export interface CustomerBase {
  ci: string;
  address: string;
  phoneNumber: string;
  driverLicenseNumber: string;
}

export interface Customer extends CustomerBase {
  id: number;
  user: Omit<User, "role">;
}

export interface CustomerCreate extends CustomerBase {
  user: Register;
}

export interface CustomerUpdate extends CustomerBase {
  user: Omit<Register, "password">;
}

export interface CustomerRequest<T> {
  customer: T;
}
