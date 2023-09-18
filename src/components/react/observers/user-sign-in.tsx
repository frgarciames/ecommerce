import { store } from "@/lib/store";
import { observer } from "mobx-react-lite";

export const UserSignInObserver = observer(() => {
  const path = window.location.pathname;
  const previousPath = sessionStorage.getItem("previousPath");
  if (path === "/sign-in" && store.user) {
    window.location.href = previousPath || "/";
    sessionStorage.removeItem("previousPath");
  }
  return null;
});
