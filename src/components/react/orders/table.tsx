import { Button } from "@/components/shadcn/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Fragment, type ReactNode } from "react";
import type { OrderItem } from "swell-js";

type OrderTableProps = {
  children: ReactNode;
};
export const OrderTable = ({ children }: OrderTableProps) => {
  return (
    <table className="mt-4 w-full text-gray-500 sm:mt-6">
      <caption className="sr-only">Products</caption>
      <thead className="sr-only border-b-[1px] text-left text-sm text-gray-500 sm:not-sr-only">
        <tr>
          <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
            Product
          </th>
          <th
            scope="col"
            className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
          >
            Price
          </th>
          <th
            scope="col"
            className="hidden py-3 pr-8 font-normal sm:table-cell"
          >
            Status
          </th>
          <th scope="col" className="w-0 py-3 text-right font-normal">
            Info
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export const OrderItemRow = ({ item }: { item: OrderItem }) => {
  return (
    <tr>
      <td className="py-6 pr-8">
        <div className="flex items-center">
          <img
            src={item?.product?.images?.[0]?.file?.url}
            alt={item.product?.name}
            className="mr-6 h-16 w-16 rounded object-cover object-center"
          />
          <div>
            <div className="font-medium text-gray-900">
              {item?.product?.name}
            </div>
            <div className="mt-1 sm:hidden">{item.price}</div>
          </div>
        </div>
      </td>
      <td className="hidden py-6 pr-8 sm:table-cell">{item.price}</td>
      <td className="hidden py-6 pr-8 sm:table-cell">{item.status}</td>
      <td className="whitespace-nowrap py-6 text-right font-medium">
        <a
          href={`/products/${item?.product?.slug}`}
          className="text-indigo-600"
        >
          View
          <span className="hidden lg:inline"> Product</span>
        </a>
      </td>
    </tr>
  );
};

type OrderPaginationProps = {
  limit: number;
  page: number;
  totalPages: number;
};
export const OrderPagination = ({
  limit,
  page,
  totalPages,
}: OrderPaginationProps) => {
  console.log(page);
  console.log(totalPages);
  console.log(page === totalPages);
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
      <span />
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={String(limit)}
            onValueChange={(size) => {
              const anchor = document.querySelector(
                `a[href="/orders?limit=${size}&page=1"]`,
              ) as HTMLAnchorElement;
              if (!anchor) return;
              anchor.click();
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 3, 5, 10, 15].map((pageSize) => (
                <Fragment key={pageSize}>
                  <SelectItem value={String(pageSize)}>{pageSize}</SelectItem>
                  <a
                    href={`/orders?limit=${pageSize}&page=1`}
                    className="hidden"
                  />
                </Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 lg:flex"
            disabled={page === 1}
          >
            <a
              className="flex h-full w-full items-center justify-center"
              href={`/orders?page=${1}&limit=${limit}`}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={page === 1}
          >
            <a
              className="flex h-full w-full items-center justify-center"
              href={`/orders?page=${page - 1}&limit=${limit}`}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={page === totalPages}
          >
            <a
              className="flex h-full w-full items-center justify-center"
              href={`/orders?page=${page + 1}&limit=${limit}`}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 lg:flex"
            disabled={page === totalPages}
          >
            <a
              className="flex h-full w-full items-center justify-center"
              href={`/orders?page=${totalPages}&limit=${limit}`}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
