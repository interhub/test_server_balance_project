import { UserModel } from '../models/user.model';

export type CreateUserDto = Pick<UserModel, 'balance'>;
export type UpdateUserDto = Pick<UserModel, 'balance'>;
