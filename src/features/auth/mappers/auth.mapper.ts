import { AuthEntity, TokenEntity } from "@/features/auth/entities/auth.entity";
import { AuthModel } from "@/features/auth/models/auth.model";
import { UserRoleMapper } from "@/features/users/mappers/user-role.mapper";
import { Mapper } from "@/shared/interfaces/mapper.interface";
import { jwtDecode } from "jwt-decode";

export class AuthMapper implements Mapper<AuthEntity, AuthModel> {
  private userRoleMapper = new UserRoleMapper();

  toModel(entity: AuthEntity): AuthModel {
    try {
      const tokenDecoded: TokenEntity = jwtDecode(entity.token);
      return {
        user: {
          id: tokenDecoded.sub,
          firstName: tokenDecoded.first_name,
          lastName: tokenDecoded.last_name,
          email: tokenDecoded.email,
          username: tokenDecoded.username,
          role: this.userRoleMapper.toModel(tokenDecoded.role),
        },
        token: entity.token,
        exp: tokenDecoded.exp,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  toEntity(model: AuthModel): AuthEntity {
    return {
      token: model.token,
    };
  }
}
