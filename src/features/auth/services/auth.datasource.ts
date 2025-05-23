import { jwtDecode } from "jwt-decode";
import {
  Auth,
  Login,
  Register,
  AuthResponse,
} from "../interfaces/auth.interface";
import AxiosClient from "@/core/infrastructure/http/axios-client";
import { TokenDecode } from "../interfaces/toke-decode.interface";
import { EmailGender } from "../interfaces/email-gender.interface";
import { Recovery } from "../interfaces/recovery.interface";

interface IAuthService {
  login(user: Login): Promise<Auth>;
  register(user: Register): Promise<Auth>;
  logout(): Promise<void>;
  decodeToken(token: string): Auth;
  emailGender(email: EmailGender): Promise<string>;
  recoveryPassword(user: Recovery): Promise<string>;
}

export class AuthService implements IAuthService {
  private url: string = "api/v1/auth";
  private axiosCLient: AxiosClient;
  private static instance: AuthService;

  private constructor() {
    this.axiosCLient = AxiosClient.getInstance();
  }

  async recoveryPassword(user: Recovery): Promise<string> {
    const { data } = await this.axiosCLient.put(`${this.url}/password`, {
      user,
    });
    return data.message;
  }

  async emailGender(email: EmailGender): Promise<string> {
    const { data } = await this.axiosCLient.post(`${this.url}/password`, {
      user: email,
    });
    return data.message;
  }

  public static getInstance(): IAuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(user: Login): Promise<Auth> {
    const { data } = await this.axiosCLient.post<AuthResponse>(
      `${this.url}/login`,
      {
        user,
      }
    );

    return this.decodeToken(data.data.token);
  }

  async register(user: Register): Promise<Auth> {
    const { data } = await this.axiosCLient.post<AuthResponse>(
      `${this.url}/signup`,
      {
        user,
      }
    );

    return this.decodeToken(data.data.token);
  }

  async logout(): Promise<void> {
    await this.axiosCLient.delete(`${this.url}/logout`);
  }

  decodeToken(token: string): Auth {
    try {
      const tokenDecoded: TokenDecode = jwtDecode(token);
      return {
        user: {
          id: tokenDecoded.sub,
          firstName: tokenDecoded.first_name,
          lastName: tokenDecoded.last_name,
          email: tokenDecoded.email,
          username: tokenDecoded.username,
          role: tokenDecoded.role,
        },
        token: token,
        exp: tokenDecoded.exp,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Token invalido");
    }
  }
}
