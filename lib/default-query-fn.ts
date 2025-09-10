import api from "./axios";

export const defaultQueryFn = async ({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, ...params] = queryKey;

  const { data } = await api.get(key as string);
  return data;
};
