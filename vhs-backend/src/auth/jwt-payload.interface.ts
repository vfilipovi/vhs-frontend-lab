import { UserRole } from './entities/user.role.enum';

export interface JwtPayload {
  id: number;
  username: string;
  role: UserRole;
}
