import { RegisterEntity } from "@/features/auth/entities/auth.entity";
import { RegisterModel } from "@/features/auth/models/auth.model";
import { UserRoleMapper } from "@/features/users/mappers/user-role.mapper";
import { Mapper } from "@/shared/interfaces/mapper.interface";

export class RegisterMapper implements Mapper<RegisterEntity, RegisterModel> {
  private userRoleMapper = new UserRoleMapper();
  toModel(entity: RegisterEntity): RegisterModel {
    return {
      firstName: entity.first_name,
      lastName: entity.last_name,
      username: entity.username,
      email: entity.email,
      password: entity.password,
    };
  }

  toEntity(model: RegisterModel): RegisterEntity {
    return {
      first_name: model.firstName,
      last_name: model.lastName,
      username: model.username,
      email: model.email,
      password: model.password,
    };
  }
}
