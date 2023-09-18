import { store } from "./store";

export const addProductToCart = (productId: string, quantity = 1) => {
  return store.updateCart({
    operation: "addItem",
    args: [
      {
        productId,
        quantity,
      },
    ],
  });
};

export const removeProductFromCart = (id: string) => {
  return store.updateCart({
    operation: "removeItem",
    args: [id],
  });
};

export const changeProductQuantityInCart = (id: string, quantity: number) => {
  return store.updateCart({
    operation: "updateItem",
    args: [id, { quantity }],
  });
};

export const signIn = (email: string, password: string) => {
  return store.signIn(email, password);
};

export const signOut = () => {
  return store.signOut();
};

export type GetOrdersOptions = {
  page?: number;
  limit?: number;
};

export const getOrders = (options?: GetOrdersOptions) => {
  return store.getOrders(options);
};
