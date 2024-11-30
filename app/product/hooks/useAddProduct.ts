import { AxiosError } from "axios";
import { useAddToCart } from "../api/mutation";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddProduct = () => {
  const addToCart = useAddToCart();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleAddToCart = async (productId: string, quantity: number) => {
    addToCart.mutate({ productId, quantity }, 
      {
        onSuccess: () => {
          toast.success("Product added to cart");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          router.push("/cart");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message || "Something went wrong");
          } else {
            toast.error("Something went wrong")
          }
        }
      }
    )
  }

  return {
    handleAddToCart
  }
}