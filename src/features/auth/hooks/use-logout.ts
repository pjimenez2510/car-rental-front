"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function useLogout() {
  const router = useRouter();
  const onLogout = async () => {
    await signOut();
    toast.success("Sesión cerrada exitosamente");
    router.push("/login");
    /* await AuthDatasourceImpl.getInstance()
      .logout()
      .then(async (res) => {
        const isLogged = await logout();

        if (!isLogged.ok) {
          toast.error(isLogged.message);
          return;
        }
        toast.success(isLogged.message);
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      }); */
  };

  return { onLogout };
}
