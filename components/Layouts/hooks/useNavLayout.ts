import { useState } from "react"
import { useLogout } from "@/components/Forms/api/mutations"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

export const useNavLayout = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignup, setOpenSignup] = useState(false)
  const logoutMutation = useLogout()
  const queryClient = useQueryClient()

  const handleOpenLogin = (open: boolean) => {
    setOpenLogin(open)
  }

  const handleOpenSignup = (open: boolean) => {
    setOpenSignup(open)
  }

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["me"]})
        toast.success("Logged out successfully")
        window.location.reload()
      }
    })
  }

  return {
    openLogin,
    openSignup,
    handleOpenLogin,
    handleOpenSignup,
    handleLogout
  }
}