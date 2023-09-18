import { ShoppingCart, X } from "lucide-react";
import { useState, forwardRef, useRef } from "react";
import type { CartItem, Cart as CartType } from "swell-js";
import { Drawer } from "vaul";
import { Button } from "../../shadcn/ui/button";
import {
  changeProductQuantityInCart,
  removeProductFromCart,
} from "@/lib/services.client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../shadcn/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/ui/select";
import { observer } from "mobx-react-lite";
import { store } from "@/lib/store";

type CartTriggerProps = React.HTMLAttributes<HTMLButtonElement> & {
  totalItems: number;
};
const CartTrigger = forwardRef<React.ElementRef<"button">, CartTriggerProps>(
  ({ totalItems, ...props }, ref) => {
    return (
      <button className="relative" {...props} ref={ref}>
        {totalItems > 0 && (
          <span
            key={totalItems}
            className="absolute -bottom-3 -right-3 animate-jump rounded-full bg-slate-200 p-2.5 text-xs animate-once"
          >
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {totalItems}
            </p>
          </span>
        )}
        <ShoppingCart />
      </button>
    );
  },
);

const ItemCart = ({
  item,
  currency = "EUR",
}: {
  item: CartItem;
  currency?: string;
}) => {
  const removeItem = () => {
    if (!item.id) return;
    removeProductFromCart(item.id);
  };

  const changeQuantity = (quantity: string) => {
    if (!item.id) return;
    changeProductQuantityInCart(item.id, Number(quantity));
  };

  return (
    <li
      className={cn(
        "flex py-6 first:pt-2 last:pb-2 [&:not(:last-child)]:border-b-[1px]",
      )}
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item?.product?.images?.[0]?.file?.url}
          alt={item?.product?.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a>{item.product?.name}</a>
            </h3>
            <p className="ml-4">
              {item?.priceTotal} {currency}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item?.variant?.name}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <Select
            value={String(item?.quantity) || "0"}
            onValueChange={changeQuantity}
          >
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex">
            <Button
              variant="destructive"
              className="rounded-md"
              size="sm"
              onClick={removeItem}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

const TotalCart = ({
  className,
  currency = "EUR",
  total = 0,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  total?: number;
  currency?: string;
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex justify-between text-base font-medium text-gray-900",
          className,
        )}
        {...props}
      >
        <p>Subtotal</p>
        <p>
          {total} {currency}
        </p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
    </div>
  );
};

const CheckoutButton = ({
  className,
  url,
  ...props
}: React.ComponentProps<typeof Button> & { url: string }) => (
  <a href={url}>
    <Button className="w-full" {...props}>
      Checkout
    </Button>
  </a>
);

const FooterCart = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer
      className={cn(
        "flex flex-col space-y-6 border-t border-gray-200 bg-white p-4 shadow",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
};

type CartProps = {
  cart: CartType | null;
};
const CartMobile = ({ cart }: CartProps) => {
  const totalItems = cart?.items?.length ?? 0;
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <CartTrigger totalItems={cart?.items?.length ?? 0} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40 md:hidden" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-10 mt-24 flex h-[90%] flex-col overflow-hidden rounded-t-[10px] bg-white md:hidden">
          <div className="sticky top-0 flex w-full  flex-shrink-0 items-center justify-center bg-white p-5">
            <span className="mx-auto  h-1.5 w-12 rounded-full bg-zinc-300" />
          </div>
          {totalItems === 0 ? (
            <CartEmpty />
          ) : (
            <>
              <CartList className="p-6">
                {cart?.items?.map((item) => (
                  <ItemCart
                    item={item}
                    currency={cart.currency}
                    key={item.id}
                  />
                ))}
              </CartList>
              <FooterCart>
                <TotalCart
                  total={cart?.subTotal || 0}
                  currency={cart?.currency}
                />
                {cart?.checkoutUrl && (
                  <CheckoutButton size="lg" url={cart.checkoutUrl} />
                )}
              </FooterCart>
            </>
          )}
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const CartList = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul
      role="list"
      className={cn(
        "flex-1 overflow-auto overflow-x-hidden bg-white p-4",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
};

const CartEmpty = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <p className="mt-4 text-xl text-gray-500">Your cart is empty 😔</p>
    </div>
  );
};

const CartDesktop = ({ cart }: CartProps) => {
  const totalItems = cart?.items?.length ?? 0;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CartTrigger totalItems={cart?.items?.length ?? 0} />
      </SheetTrigger>
      <SheetContent className="flex flex-1 flex-col gap-0 p-0 sm:max-w-lg">
        <SheetHeader className="flex flex-row items-center justify-between border-b-[1px] p-6 text-left">
          <SheetTitle className="text-2xl">Your cart</SheetTitle>
          <SheetClose>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        {totalItems === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <CartList className="p-6">
              {cart?.items?.map((item) => (
                <ItemCart item={item} currency={cart.currency} key={item.id} />
              ))}
            </CartList>
            <FooterCart>
              <TotalCart
                total={cart?.subTotal || 0}
                currency={cart?.currency}
              />
              {cart?.checkoutUrl && (
                <CheckoutButton size="lg" url={cart.checkoutUrl} />
              )}
            </FooterCart>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export const Cart = observer(() => {
  console.log(store.cart);
  return (
    <>
      <div className="md:hidden">
        <CartMobile cart={store.cart} />
      </div>
      <div className="relative hidden md:block">
        <CartDesktop cart={store.cart} />
      </div>
    </>
  );
});
