import { swellClient } from "./swell/swell.client";

export const signIn = (email: string, password: string) => {
  return swellClient.client.account.login(email, password);
};

export type GetOrdersOptions = {
  page?: number;
  limit?: number;
};

export const getOrders = (options?: GetOrdersOptions) => {
  return swellClient.client.account.listOrders(options);
};

export const recoverPassword = (options: Record<string, string>) => {
  return swellClient.client.account.recover(options);
};
