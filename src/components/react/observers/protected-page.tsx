import { store } from "@/lib/store";
import { observer } from "mobx-react-lite";
import type { ReactNode } from "react";

export const ProtectedPageObserver = observer(
  ({ children }: { children: ReactNode }) => {
    const path = window.location.pathname;
    if (store.user === undefined) return null;
    if (store.user === null) {
      sessionStorage.setItem("previousPath", path);
      window.location.href = "/sign-in";
      return null;
    }
    return children;
  },
);
