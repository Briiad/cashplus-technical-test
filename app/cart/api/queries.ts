import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/Product.service";
import { GetCartResponse } from "./interface";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export const useGetCart = () => {
  const { user } = useCurrentUser();
  return useQuery<GetCartResponse, Error>({
    queryKey: ["cart"],
    queryFn: getCart,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });
};