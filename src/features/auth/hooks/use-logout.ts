"use client";

import { useAuthFacade } from "./use-auth-facade";

export function useLogout() {
  const { logoutHandler } = useAuthFacade();
  const onLogout = async () => {
    await logoutHandler();
  };

  return { onLogout };
}
