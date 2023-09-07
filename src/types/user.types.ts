export interface IUserReg {
  name: string;
  email: string;
  password: string;
}
export interface IUserLog {
  email: string;
  password: string;
  id: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
}
