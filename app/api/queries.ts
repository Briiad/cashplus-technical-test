import { useQuery }from "@tanstack/react-query";
import { getCurrentUser } from "@/services/Auth.service";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}