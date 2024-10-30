"use client";
import { Menu } from "lucide-react";
import React from "react";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../dashboard/navbar/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSession } from "next-auth/react";
import { UserNav } from "../dashboard/navbar/user-nav";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserRole } from "@/features/users/interfaces/user.interface";

interface RouteProps {
  href: string;
  label: string;
  active: boolean;
  isShow: (role?: UserRole) => boolean;
}

const routeList = (path: string): RouteProps[] => [
  {
    href: "/vehicles",
    label: "Vehiculos",
    active: path.startsWith("/vehicles"),
    isShow: () => {
      return true;
    },
  },
  {
    href: "/reservation",
    label: "Reservas",
    active: path.startsWith("/reservation"),
    isShow: (role?: UserRole) => {
      if (!role) return false;
      const isRoleAllowed = [UserRole.Customer].includes(role);
      return isRoleAllowed;
    },
  },
  {
    href: "/management/vehicles/list",
    label: "Administración",
    active: path.startsWith("/management/vehicles/list"),
    isShow: (role?: UserRole) => {
      if (!role) return false;
      const isRoleAllowed = [UserRole.Admin, UserRole.Employee].includes(role);
      return isRoleAllowed;
    },
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const sesion = useSession();
  const path = usePathname();
  const routes = routeList(path);
  return (
    <header className="shadow-inner bg-opacity-15 w-full top-0 mx-auto sticky border-b-2 border-secondary z-40 flex justify-between items-center p-2 bg-card">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="font-bold text-lg flex items-center">
          <Image
            src="/images/logo.avif"
            alt="RentCar logo"
            className="rounded-full mr-2"
            width={40}
            height={40}
          />
          RentCar
        </Link>

        <NavigationMenu className="hidden lg:block mx-auto">
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center gap-2">
              {routes.map(
                ({ href, label, active, isShow }) =>
                  isShow(sesion.data?.user?.role as UserRole) && (
                    <NavigationMenuLink
                      key={href}
                      asChild
                      className={cn([
                        "hover:bg-accent py-2 px-4 rounded-md",
                        active && "bg-accent text-accent-foreground",
                      ])}
                    >
                      <Link href={href} className="text-base px-2">
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  )
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex space-x-2">
          <ModeToggle />
          {sesion.data?.user ? (
            <UserNav />
          ) : (
            <Button
              asChild
              variant="default"
              aria-label="Login"
              className="ml-auto"
            >
              <Link aria-label="Login" href="/login">
                Iniciar sesión
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Menu
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer lg:hidden"
              />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
            >
              <div>
                <SheetHeader className="mb-4 ml-4">
                  <SheetTitle className="flex items-center">
                    <Link href="/" className="flex items-center">
                      <Image
                        src="/images/logo.avif"
                        alt="RentCar logo"
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                      <h1 className="text-lg font-bold ml-2">RentCar</h1>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  {routes.map(({ href, label, active }) => (
                    <Button
                      key={href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="ghost"
                      className={cn([
                        "justify-start text-base",
                        active && "bg-accent",
                      ])}
                    >
                      <Link href={href}>{label}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
