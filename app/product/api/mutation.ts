import { useMutation } from "@tanstack/react-query";
import { postProductToCart } from "@/services/Product.service";
import { PostProductToCartRequest, PostProductToCartResponse } from "./interface";

export const useAddToCart = () => {
  return useMutation<PostProductToCartResponse, Error, PostProductToCartRequest>({
    mutationFn: (value) => postProductToCart(value),
  })
}