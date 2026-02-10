// src/modules/users/entities/user.entity.ts
import { Role } from '../../common/enums/role.enum';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
