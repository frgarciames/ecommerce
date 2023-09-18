import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { useToast } from "@/components/shadcn/ui/use-toast";
import { store } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";

type PersonalInformationProps = {
  user: typeof store.user;
};
export const PersonalInformation = ({ user }: PersonalInformationProps) => {
  const { toast } = useToast();
  const { mutateAsync, isLoading } = useMutation(
    ["update_user"],
    store.updateUser,
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Your information has been updated",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    },
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutateAsync(data);
  };
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10  md:grid-cols-3 ">
      <div>
        <h2 className="text-base font-semibold leading-7 ">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Use a permanent address where you can receive mail.
        </p>
      </div>

      <form className="md:col-span-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8  sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium leading-6 "
            >
              First name
            </label>
            <div className="mt-2">
              <Input
                defaultValue={user?.firstName}
                type="text"
                name="first_name"
                id="first_name"
                autoComplete="given-name"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium leading-6 "
            >
              Last name
            </label>
            <div className="mt-2">
              <Input
                defaultValue={user?.lastName}
                type="text"
                name="last_name"
                id="last_name"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 "
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                defaultValue={user?.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <Button
            className="w-full sm:w-auto"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};
