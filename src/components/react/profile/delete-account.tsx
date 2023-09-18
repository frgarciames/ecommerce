import { Button } from "@/components/shadcn/ui/button";

export const DeleteAccount = () => {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10  md:grid-cols-3 ">
      <div>
        <h2 className="text-base font-semibold leading-7 ">Delete account</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          No longer want to use our service? You can delete your account here.
          This action is not reversible. All information related to this account
          will be deleted permanently.
        </p>
      </div>

      <form className="flex items-start md:col-span-2">
        <Button type="submit" variant="destructive">
          Yes, delete my account
        </Button>
      </form>
    </div>
  );
};
