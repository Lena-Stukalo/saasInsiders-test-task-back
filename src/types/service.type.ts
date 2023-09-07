import { IUser } from './user.types';

export interface Iservice {
  init(): Promise<boolean>;
}
export interface IEnv {
  DB_HOST: string;
  PORT: string;
  SECRET_KEY: string;
}
export interface ErrorWithStatus extends Error {
  status: number;
}
export interface CustomRequest extends Request {
  user: IUser;
}
