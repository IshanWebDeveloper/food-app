export type CommonResponseDataType<T> = {
  status: "SUCCESS" | "FAIL";
  message: string;
  data: T;
};
