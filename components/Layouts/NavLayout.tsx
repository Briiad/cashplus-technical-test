"use client";

import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AuthDialog } from "../CustomDialog/AuthDialog";
import { useNavLayout } from "./hooks/useNavLayout";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiLogout } from "react-icons/ci";
import { DynamicButton } from "../DynamicButton";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/app/cart/hooks/useCart";

interface NavLayoutProps {
  children: React.ReactNode;
}

export const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  const {
    openLogin,
    openSignup,
    handleOpenLogin,
    handleOpenSignup,
    handleLogout,
  } = useNavLayout();

  const { user } = useCurrentUser();
  const { data } = useCart();

  return (
    <>
      <div className="relative">
        <nav className="w-full fixed h-auto p-6 z-50 flex items-center justify-between px-32 left-0 right-0 bg-[#fff] border-b border-black/10 drop-shadow-lg">
          <div className="text-24 font-bold">
            <Link href={"/"}>Blüte</Link>
          </div>

          <div className="flex items-center gap-8">
            <Link href={"/cart"}>
              <div className="relative">
                <ShoppingBasket />
                {(data?.length ?? 0) > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {data?.length ?? undefined}
                  </div>
                )}
              </div>
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="!bg-primary">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-14 font-semibold text-center flex items-center justify-between"
                    >
                      <div>Logout</div>
                      <CiLogout className="size-4 text-red-500" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <DynamicButton
                title="Join Us"
                onClick={() => handleOpenLogin(true)}
              />
            )}
          </div>
        </nav>

        <div className="z-0">{children}</div>

        <footer className="w-full h-24 flex items-center justify-center border-t border-black/30">
          <p className="text-14 font-semibold">
            © 2024 Blüte. All rights reserved.
          </p>
        </footer>
      </div>

      <AuthDialog
        open={openLogin}
        onOpenChange={handleOpenLogin}
        type="login"
        title="Login"
        description="Login to your account"
        changeType={() => {
          handleOpenLogin(false);
          handleOpenSignup(true);
        }}
      />

      <AuthDialog
        open={openSignup}
        onOpenChange={handleOpenSignup}
        type="signup"
        title="Sign Up"
        description="Create an account"
        changeType={() => {
          handleOpenSignup(false);
          handleOpenLogin(true);
        }}
      />
    </>
  );
};
