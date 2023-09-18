import { getOrders, type GetOrdersOptions } from "@/lib/services.client";
import { OrderHeader } from "./header";
import { OrderTable, OrderItemRow, OrderPagination } from "./table";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { OrdersSkeleton } from "./skeleton";

type OrdersProps = {
  limit: number;
  page: number;
};
export const Orders = ({ limit, page }: OrdersProps) => {
  const { data, isLoading, error } = useQuery(
    ["orders", { page, limit }],
    ({ queryKey }) => {
      return getOrders(queryKey[1] as GetOrdersOptions);
    },
    {
      keepPreviousData: true,
    },
  );

  if (error) return <div>{error.message}</div>;

  const orders = data?.results;
  return (
    <div className="bg-white">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Order history
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Check the status of recent orders, manage returns, and download
          invoices.
        </p>
      </div>
      <div className="mt-10">
        <h2 className="sr-only">Recent orders</h2>
        <div className="space-y-10">
          {isLoading ? (
            <OrdersSkeleton />
          ) : (
            orders?.map((order) => (
              <div key={order.number}>
                <OrderHeader order={order} />
                <OrderTable>
                  {order?.items?.map((item) => (
                    <OrderItemRow item={item} key={item.id} />
                  ))}
                </OrderTable>
              </div>
            ))
          )}
        </div>
        {data && (
          <div className="mt-10">
            <OrderPagination
              totalPages={data.pageCount}
              page={page}
              limit={limit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const OrdersProvider = (props: OrdersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Orders {...props} />
    </QueryClientProvider>
  );
};
