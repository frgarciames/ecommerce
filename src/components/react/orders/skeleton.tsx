import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export const OrdersSkeleton = () => {
  return (
    <>
      <h3 className="sr-only">Order placed on </h3>

      <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
        <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
          <div className="flex justify-between sm:block">
            <dt className="font-medium text-gray-900">Date placed</dt>
            <dd className="sm:mt-1">
              <Skeleton className="h-4 w-12" />
            </dd>
          </div>
          <div className="flex justify-between pt-6 sm:block sm:pt-0">
            <dt className="font-medium text-gray-900">Order number</dt>
            <dd className="sm:mt-1">
              <Skeleton className="h-4 w-12" />
            </dd>
          </div>
          <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
            <dt>Total amount</dt>
            <dd className="sm:mt-1">
              <Skeleton className="h-4 w-12" />
            </dd>
          </div>
        </dl>
        <Button disabled className="mt-10 w-full md:mt-0 md:w-auto">
          <a>View Invoice</a>
        </Button>
      </div>
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
        <tbody>
          {Array.from({ length: 3 }).map((_, i) => (
            <tr key={i}>
              <td className="py-6 pr-8">
                <div className="flex items-center">
                  <Skeleton className="mr-6 h-16 w-16 rounded object-cover object-center" />
                  <div className="flex flex-col space-y-2">
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
              </td>
              <td className="hidden py-6 pr-8 sm:table-cell">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="hidden py-6 pr-8 sm:table-cell">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="whitespace-nowrap py-6 text-right font-medium">
                <Skeleton className="h-4 w-12" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
