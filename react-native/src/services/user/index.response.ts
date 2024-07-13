import { User } from '../../../../client/src/types/user';

export interface UserResponse {
  err: number;
  msg: string;
  response: User;
}
