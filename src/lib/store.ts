import Swell, { type Account, type Cart } from "swell-js";
import { makeAutoObservable } from "mobx";
import { swellClient } from "./swell/swell.client";
import { signIn } from "./services.client";

type SwellCart = (typeof Swell)["cart"];
type SwellCartOperations = keyof SwellCart;
type SwellOnlyCartOperations = Exclude<
  SwellCartOperations,
  "getSettings" | "getShippingRates" | "submitOrder"
>;

type UpdateCartFnArgs<Operation extends SwellOnlyCartOperations> = {
  operation: Operation;
  args: Parameters<SwellCart[Operation]>;
};

const getTotal = (items: Cart["items"]) => {
  return items?.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0,
  );
};

const makeOptimisticOperation = <Operation extends SwellOnlyCartOperations>(
  operation: Operation,
) => {
  switch (operation) {
    case "removeItem":
      return (args: Parameters<SwellCart[Operation]>) => {
        const newItems = store.cart?.items?.filter(
          (item) => item.id !== args[0],
        );
        store.cart = {
          ...store.cart,
          subTotal: getTotal(newItems),
          items: newItems,
        };
      };
    case "updateItem":
      return (args: Parameters<SwellCart[Operation]>) => {
        const newItems = store.cart?.items?.map((item) => {
          if (item.id === args[0]) {
            return {
              ...item,
              ...args[1],
              priceTotal:
                (item?.price || 0) * (args[1]?.quantity || item.quantity || 0),
            };
          }
          return item;
        });
        store.cart = {
          ...store.cart,
          subTotal: getTotal(newItems),
          items: newItems,
        };
      };
  }
};

export class Store {
  private _cart: Cart | null = null;
  private _user: Account | null | undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    swellClient.client.account.get().then((user) => {
      this.user = user;
    });
    swellClient.client.cart.get().then((cart) => {
      this.cart = cart;
    });
  }

  get user() {
    return this._user;
  }

  set user(user: Account | null | undefined) {
    this._user = user;
  }

  get cart() {
    return this._cart;
  }

  set cart(cart: Cart | null) {
    this._cart = cart;
  }

  updateCart({ operation, args }: UpdateCartFnArgs<SwellOnlyCartOperations>) {
    makeOptimisticOperation?.(operation)?.(args);
    // @ts-ignore
    swellClient.client.cart[operation](...args).then((cart) => {
      if ((cart as any).errors) return;
      this.cart = cart;
    });
  }

  signIn(email: string, password: string) {
    return swellClient.client.account.login(email, password).then((user) => {
      this.user = user;
      return user;
    });
  }

  *changePassword({
    email,
    newPassword,
    confirmNewPassword,
    currentPassword,
  }: {
    newPassword: string;
    confirmNewPassword: string;
    currentPassword: string;
    email: string;
  }) {
    if (newPassword !== confirmNewPassword) {
      throw new Error("Passwords do not match");
    }
    const account: Account = yield signIn(email, currentPassword);
    if (!account) {
      throw new Error("Invalid password");
    }
    return this.updateUser({ password: newPassword });
  }

  signOut() {
    swellClient.client.account.logout().then(() => {
      this.user = null;
    });
  }

  updateUser(data: Partial<Account>) {
    return swellClient.client.account.update(data).then((user) => {
      this.user = user;
    });
  }
  addProductToCart(productId: string, quantity = 1) {
    return this.updateCart({
      operation: "addItem",
      args: [
        {
          productId,
          quantity,
        },
      ],
    });
  }

  removeProductFromCart(id: string) {
    return this.updateCart({
      operation: "removeItem",
      args: [id],
    });
  }

  changeProductQuantityInCart(id: string, quantity: number) {
    return this.updateCart({
      operation: "updateItem",
      args: [id, { quantity }],
    });
  }
}

export const store = new Store();
