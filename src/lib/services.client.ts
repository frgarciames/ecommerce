import type { Account, Cart } from "swell-js";
import { swellClient } from "./swell/swell.client";

export const addProductToCart = (productId: string, quantity = 1) => {
  return swellClient.updateCart({
    operation: "addItem",
    args: [
      {
        productId,
        quantity,
      },
    ],
  });
};

type OnCartUpdatedCb = (cart: Cart | null) => void;
export const onCartUpdated = (cb: OnCartUpdatedCb) => {
  swellClient.subscribeToCart(cb);
};

export const removeProductFromCart = (id: string) => {
  return swellClient.updateCart({
    operation: "removeItem",
    args: [id],
  });
};

export const changeProductQuantityInCart = (id: string, quantity: number) => {
  return swellClient.updateCart({
    operation: "updateItem",
    args: [id, { quantity }],
  });
};

export const onUserChange = (cb: (user: Account | null) => void) => {
  swellClient.onUserChange(cb);
};

export const getUser = () => {
  return swellClient.user;
};

export const signIn = (email: string, password: string) => {
  return swellClient.signIn(email, password);
};

export const signOut = () => {
  return swellClient.signOut();
};
