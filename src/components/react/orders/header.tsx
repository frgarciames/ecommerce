import type { Order } from "swell-js";
import { Button } from "../../shadcn/ui/button";

type OrderHeaderProps = {
  order: Order;
};
export const OrderHeader = ({ order }: OrderHeaderProps) => {
  return (
    <>
      <h3 className="sr-only">
        Order placed on{" "}
        <time dateTime={order.dateCreated}>{order.dateCreated}</time>
      </h3>

      <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
        <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
          <div className="flex justify-between sm:block">
            <dt className="font-medium text-gray-900">Date placed</dt>
            <dd className="sm:mt-1">
              <time dateTime={order.dateCreated}>
                {new Date(order.dateCreated || "").toLocaleDateString("ES")}
              </time>
            </dd>
          </div>
          <div className="flex justify-between pt-6 sm:block sm:pt-0">
            <dt className="font-medium text-gray-900">Order number</dt>
            <dd className="sm:mt-1">{order.number}</dd>
          </div>
          <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
            <dt>Total amount</dt>
            <dd className="sm:mt-1">{order.subTotal}</dd>
          </div>
        </dl>
        <Button className="mt-10 w-full sm:mt-0 sm:w-auto">
          <a>
            View Invoice
            <span className="sr-only">for order {order.number}</span>
          </a>
        </Button>
      </div>
    </>
  );
};
