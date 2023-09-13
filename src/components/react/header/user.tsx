import { swellClient } from "@/lib/swell/swell.client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { LogOut, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Account } from "swell-js";
import { signOut } from "@/lib/services.client";

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
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-between" onClick={signOut}>
          Log out
          <LogOut className="h-5 w-5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const User = () => {
  const [user, setUser] = useState<Account | null>(null);

  useEffect(() => {
    swellClient.onUserChange(setUser);
  }, []);

  if (!user) return <SignIn />;

  return <Profile />;
};
