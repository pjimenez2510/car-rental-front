import { LoginEntity } from "@/features/auth/entities/auth.entity";
import { LoginModel } from "@/features/auth/models/auth.model";
import { Mapper } from "@/shared/interfaces/mapper.interface";

export class LoginMapper implements Mapper<LoginEntity, LoginModel> {
  toModel(entity: LoginEntity): LoginModel {
    return {
      email: entity.email,
      password: entity.password,
    };
  }

  toEntity(model: LoginModel): LoginEntity {
    return {
      email: model.email,
      password: model.password,
    };
  }
}
