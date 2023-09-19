import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { useToast } from "@/components/shadcn/ui/use-toast";
import { store } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

export const ChangePassword = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { isLoading, mutateAsync } = useMutation(
    ["change_password"],
    store.changePassword,
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password has been changed",
        });
        formRef.current?.reset();
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
    const data = Object.fromEntries(formData.entries()) as Omit<
      Parameters<typeof store.changePassword>[0],
      "email"
    >;
    mutateAsync({
      email: store.user?.email as string,
      ...data,
    });
  };
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10  py-16  md:grid-cols-3 ">
      <div>
        <h2 className="text-base font-semibold leading-7 ">Change password</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Update your password associated with your account.
        </p>
      </div>

      <form
        className="md:col-span-2"
        name="change-password"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium leading-6 "
            >
              Current password
            </label>
            <div className="mt-2">
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium leading-6 "
            >
              New password
            </label>
            <div className="mt-2">
              <Input
                id="new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 "
            >
              Confirm new password
            </label>
            <div className="mt-2">
              <Input
                id="confirm-password"
                name="confirmNewPassword"
                type="password"
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Changing..." : "Change"}
          </Button>
        </div>
      </form>
    </div>
  );
};
