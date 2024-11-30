import { useMutation } from "@tanstack/react-query";
import { putCartUpdate, deleteCartItem } from "@/services/Product.service";
import {
  PutCartUpdateRequest,
  DeleteCartItemRequest,
  PutCartUpdateResponse,
  DeleteCartItemResponse,
} from "./interface";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<PutCartUpdateResponse, Error, PutCartUpdateRequest>({
    mutationFn: (value) => putCartUpdate(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteCartItemResponse, Error, DeleteCartItemRequest>({
    mutationFn: (value) => deleteCartItem(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });
};