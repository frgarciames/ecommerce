import Swell, { type Account, type Cart } from "swell-js";

export class SwellClient {
  static initialized: boolean = false;
  private _cart: Cart | null = null;
  private _user: Account | null = null;
  private cartSubscribers: Array<(cart: Cart | null) => void> = [];
  private userSubscribers: Array<(cart: Account | null) => void> = [];

  constructor() {
    Swell.init(
      import.meta.env.PUBLIC_SWELL_STORE_ID,
      import.meta.env.PUBLIC_SWELL_API_KEY,
      {
        useCamelCase: true,
      },
    );
    Swell.account.get().then((user) => {
      this.user = user;
    });
  }

  get user() {
    return this._user;
  }

  set user(user: Account | null) {
    this._user = user;
    this.notifyUserSubscribers();
  }

  get cart() {
    return this._cart;
  }

  set cart(cart: Cart | null) {
    this._cart = cart;
    this.notifyCartSubscribers();
  }

  private notifyCartSubscribers() {
    this.cartSubscribers.forEach((callback) => callback(this._cart));
  }

  private notifyUserSubscribers() {
    this.userSubscribers.forEach((callback) => callback(this._user));
  }

  onUserChange(callback: (user: Account | null) => void) {
    this.userSubscribers.push(callback);
    Swell.account.get().then((user) => {
      this.user = user;
    });
  }

  subscribeToCart(callback: (cart: Cart | null) => void) {
    this.cartSubscribers.push(callback);
    Swell.cart.get().then((cart) => {
      this.cart = cart;
    });
  }
  updateCart({ operation, args }: UpdateCartFnArgs<SwellOnlyCartOperations>) {
    // @ts-ignore
    Swell.cart[operation](...args).then((cart) => {
      if ((cart as any).errors) return;
      this.cart = cart;
    });
  }

  signIn(email: string, password: string) {
    Swell.account.login(email, password).then((user) => {
      this.user = user;
    });
  }

  signOut() {
    Swell.account.logout().then(() => {
      this.user = null;
    });
  }
}
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

export const swellClient = new SwellClient();
