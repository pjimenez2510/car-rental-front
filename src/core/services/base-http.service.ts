import AxiosClient from "../infrastructure/http/AxiosClient";

export abstract class BaseHttpService<T, CreateParams, UpdateParams> {
  protected http: AxiosClient;
  protected abstract baseUrl: string;
  constructor() {
    this.http = AxiosClient.getInstance();
  }

  static getInstance<
    T,
    CreateParams,
    UpdateParams,
    S extends BaseHttpService<T, CreateParams, UpdateParams>
  >(this: new () => S): S {
    return new this();
  }

  async getById(id: number): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await this.http.get<T>(url);
    return this.extractSingleItem(data.data);
  }

  async getAll(): Promise<T[]> {
    const { data } = await this.http.get<T[]>(this.baseUrl);
    return this.extractArrayItems(data.data);
  }

  async create(params: CreateParams): Promise<T> {
    const { data } = await this.http.post<T>(this.baseUrl, params);
    return this.extractSingleItem(data.data);
  }

  async update(id: number, params: UpdateParams): Promise<T> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await this.http.patch<T>(url, params);
    return this.extractSingleItem(data.data);
  }

  async delete(id: number): Promise<boolean> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await this.http.delete(url);
    return data.success;
  }

  protected abstract extractSingleItem(data: T): T;
  protected abstract extractArrayItems(data: T[]): T[];
}
