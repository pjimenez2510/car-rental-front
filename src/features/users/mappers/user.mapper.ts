import { UserEntity } from "@/features/users/entities/user.entity";
import { UserModel } from "@/features/users/models/user.model";
import { Mapper } from "@/shared/interfaces/mapper.interface";
import { UserRoleMapper } from "./user-role.mapper";

export class UserMapper implements Mapper<UserEntity, UserModel> {
  private userRoleMapper = new UserRoleMapper();
  toModel(entity: UserEntity): UserModel {
    return {
      id: entity.id,
      firstName: entity.first_name,
      lastName: entity.last_name,
      username: entity.username,
      email: entity.email,
      role: this.userRoleMapper.toModel(entity.role),
    };
  }

  toEntity(model: UserModel): UserEntity {
    return {
      id: model.id,
      first_name: model.firstName,
      last_name: model.lastName,
      username: model.username,
      email: model.email,
      role: this.userRoleMapper.toEntity(model.role),
    };
  }
}
