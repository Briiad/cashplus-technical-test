import { useGetCart } from "../api/queries";
import { useUpdateCartItem, useDeleteCartItem } from "../api/mutation";
import { toast } from "sonner";

export const useCart = () => {
  const cartQuery = useGetCart();
  const updateCartMutation = useUpdateCartItem();
  const deleteCartItemMutation = useDeleteCartItem();

  const handleUpdateCart = async (id: string, quantity: number) => {
    await updateCartMutation.mutateAsync({ id, quantity }, {
      onSuccess: () => {
        toast.success("Cart updated successfully");
      }
    });
  }

  const handleDeleteCartItem = async (id: string) => {
    await deleteCartItemMutation.mutateAsync({ id }, {
      onSuccess: () => {
        toast.success("Item removed from cart");
      }
    });
  }

  return {
    data: cartQuery.data?.items,
    isLoading: cartQuery.isLoading,
    handleUpdateCart,
    handleDeleteCartItem
  }
};