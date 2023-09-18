import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { LogOut, UserCircle2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { store } from "@/lib/store";

const SignIn = () => {
  return (
    <a href="/sign-in">
      <UserCircle2 />
    </a>
  );
};

const Profile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserCircle2 />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/profile">Profile</a>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/orders">Orders</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-between" onClick={store.signOut}>
          Log out
          <LogOut className="h-5 w-5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const User = observer(() => {
  if (!store.user) return <SignIn />;

  return <Profile />;
});
