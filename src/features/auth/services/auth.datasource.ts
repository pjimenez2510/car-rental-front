import { AuthModel, LoginModel, RegisterModel } from "../models/auth.model";
import { AuthEntity } from "../entities/auth.entity";
import { AuthMapper } from "../mappers/auth.mapper";
import { RegisterMapper } from "../mappers/register.mapper";
import { LoginMapper } from "../mappers/login.mapper";
import AxiosClient from "@/core/infrastructure/http/AxiosClient";

interface AuthDatasource {
  login(params: LoginModel): Promise<AuthModel>;
  register(params: RegisterModel): Promise<AuthModel>;
  logout(): Promise<void>;
}

export class AuthDatasourceImpl implements AuthDatasource {
  private url: string = "api/v1/auth";
  private axiosCLient: AxiosClient;
  private authMapper: AuthMapper;
  private registerMapper: RegisterMapper;
  private loginMapper: LoginMapper;
  private static instance: AuthDatasourceImpl;

  private constructor() {
    this.axiosCLient = AxiosClient.getInstance();
    this.authMapper = new AuthMapper();
    this.registerMapper = new RegisterMapper();
    this.loginMapper = new LoginMapper();
  }

  public static getInstance(): AuthDatasource {
    if (!AuthDatasourceImpl.instance) {
      AuthDatasourceImpl.instance = new AuthDatasourceImpl();
    }
    return AuthDatasourceImpl.instance;
  }

  async login(params: LoginModel): Promise<AuthModel> {
    const user = this.loginMapper.toEntity(params);
    const { data } = await this.axiosCLient.post<AuthEntity>(
      `${this.url}/login`,
      {
        user,
      }
    );
    return this.authMapper.toModel(data.data);
  }

  async register(params: RegisterModel): Promise<AuthModel> {
    const user = this.registerMapper.toEntity(params);
    const { data } = await this.axiosCLient.post<AuthEntity>(
      `${this.url}/signup`,
      {
        user,
      }
    );
    return this.authMapper.toModel(data.data);
  }

  async logout(): Promise<void> {
    await this.axiosCLient.delete(`${this.url}/logout`);
  }
}
