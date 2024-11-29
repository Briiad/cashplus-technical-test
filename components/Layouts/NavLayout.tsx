"use client"

import Link from "next/link"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { AuthDialog } from "../CustomDialog/AuthDialog"
import { useNavLayout } from "./hooks/useNavLayout"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CiLogout } from "react-icons/ci";
import { DynamicButton } from "../DynamicButton"
import { ShoppingBasket } from "lucide-react"

interface NavLayoutProps {
  children: React.ReactNode
}

export const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  const { openLogin, openSignup, handleOpenLogin, handleOpenSignup, handleLogout } = useNavLayout()

  const { user } = useCurrentUser()

  return (
    <>
      <div>
        <nav  className="w-10/12 mx-auto h-auto p-6 flex items-center justify-between">
          <div className="text-24 font-bold">
            <Link href={'/'}>Blüte</Link>
          </div>

          <div className="flex items-center gap-8">
            <Link href={'/cart'}>
              <div className="relative">
                <ShoppingBasket />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {/* @TODO: Will be change after integration */}
                  1 
                </div>
              </div>
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="!bg-primary">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-14 font-semibold text-center flex items-center justify-between"
                    >
                      <div>
                        Logout
                      </div>
                      <CiLogout className="size-4 text-red-500" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <DynamicButton title="Join Us!" onClick={() => handleOpenLogin(true)} />
            )}
          </div>
        </nav>
        {children}
      </div>

      <AuthDialog
        open={openLogin}
        onOpenChange={handleOpenLogin}
        type="login"
        title="Login"
        description="Login to your account"
        changeType={() => {
          handleOpenLogin(false)
          handleOpenSignup(true)
        }}
      />

      <AuthDialog
        open={openSignup}
        onOpenChange={handleOpenSignup}
        type="signup"
        title="Sign Up"
        description="Create an account"
        changeType={() => {
          handleOpenSignup(false)
          handleOpenLogin(true)
        }}
      />
    </>
  )
}