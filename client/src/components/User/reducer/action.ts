import type { User, UserId } from '../type';

export type Action =
  | { type: 'users/set'; payload: User[] }
  | { type: 'users/award'; payload: UserId }
  | { type: 'users/loose'; payload: UserId }
  | { type: 'user/add'; payload: User }
  | { type: 'user/remove'; payload: UserId }
  | { type: 'user/update'; payload: User };
