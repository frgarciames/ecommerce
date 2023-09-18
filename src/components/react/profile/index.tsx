import { store } from "@/lib/store";
import { PersonalInformation } from "./personal-info";
import { ChangePassword } from "./change-password";
import { DeleteAccount } from "./delete-account";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export const Profile = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PersonalInformation user={store.user} />
      <ChangePassword />
      <DeleteAccount />
    </QueryClientProvider>
  );
};
