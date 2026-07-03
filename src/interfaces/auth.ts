import type { IAccount } from "./accounts";

export interface IAuthLogin {
  userName: string;
  password: string;
}

export interface IAuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  account: IAccount;
}

export interface IRefreshToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRefreshTokenResponse {
  accessToken: string;
}
