export type CommonResponseDataType<T> = {
  message: string;
  data: T;
};

export enum AuthTokenType {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}
