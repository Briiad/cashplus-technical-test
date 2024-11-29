import { useQuery, useInfiniteQuery }from "@tanstack/react-query";
import { getProducts, getProductDetails } from "@/services/Product.service";
import { GetProductDetailsParams, GetProductParams, GetProductResponse } from "./interface";

export const useGetProducts = (params: GetProductParams) => {
  return useInfiniteQuery<GetProductResponse, Error>({
    queryKey: ["products"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getProducts({ ...params, offset: pageParam as number ?? 0 }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * params.limit;
      return lastPage.total > nextOffset ? nextOffset : undefined;
    },
    refetchOnWindowFocus: false,
  })
}

export const useGetProductDetails = (params: GetProductDetailsParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProductDetails(params),
    refetchOnWindowFocus: false,
  })
}