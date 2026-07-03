import type { IAuthLogin, IAuthLoginResponse, IAuthRefreshTokenResponse, IRefreshToken } from "@/interfaces/auth";

import axiosApi from ".";
import type { IResponse } from "@/interfaces";

export const loginAuthApi = async (payload: IAuthLogin) => {
  const response = await axiosApi.post("v1/auth/login", payload);
  return response as unknown as IResponse<IAuthLoginResponse>;
};

export const refreshTokenAuthApi = async (payload: IRefreshToken) => {
  const response = await axiosApi.post("v1/auth/refresh-token", payload);
  return response as unknown as IResponse<IAuthRefreshTokenResponse>;
}

export const meAuthApi = async () => {
  const response = await axiosApi.post("v1/auth/me");
  return response;
}

export const verifyTokenAuthApi = async () => {
  const response = await axiosApi.post("/v1/auth/verify-token");
  return response;
}
