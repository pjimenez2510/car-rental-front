import { UserRoleEntity } from "@/features/users/entities/user.entity";
import { UserRoleModel } from "@/features/users/models/user.model";
import { Mapper } from "@/shared/interfaces/mapper.interface";

export class UserRoleMapper implements Mapper<UserRoleEntity, UserRoleModel> {
  toModel(entity: UserRoleEntity): UserRoleModel {
    if (entity === UserRoleEntity.Admin) {
      return UserRoleModel.Admin;
    }
    if (entity === UserRoleEntity.Customer) {
      return UserRoleModel.Customer;
    }
    if (entity === UserRoleEntity.Employee) {
      return UserRoleModel.Employee;
    }
    throw new Error("Invalid UserRole");
  }

  toEntity(model: UserRoleModel): UserRoleEntity {
    if (model === UserRoleModel.Admin) {
      return UserRoleEntity.Admin;
    }
    if (model === UserRoleModel.Customer) {
      return UserRoleEntity.Customer;
    }
    if (model === UserRoleModel.Employee) {
      return UserRoleEntity.Employee;
    }
    throw new Error("Invalid UserRole");
  }
}
