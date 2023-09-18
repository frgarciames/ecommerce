import Swell, { type Account, type Cart } from "swell-js";
import { makeAutoObservable } from "mobx";
import { swellClient } from "./swell/swell.client";

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
    makeAutoObservable(this);
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
    swellClient.client.account.login(email, password).then((user) => {
      this.user = user;
    });
  }

  signOut() {
    swellClient.client.account.logout().then(() => {
      this.user = null;
    });
  }

  getOrders(options?: { limit?: number; page?: number }) {
    return swellClient.client.account.listOrders(options) as ReturnType<
      typeof swellClient.client.account.listOrders & {
        pageCount: number;
      }
    >;
  }
}

export const store = new Store();
