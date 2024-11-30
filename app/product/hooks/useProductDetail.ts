import { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGetProductDetails } from "../api/queries";

interface UseProductDetailProps {
  id: string;
}

const useProductDetail = (props: UseProductDetailProps) => {
  const { id } = props;
  const { data, isLoading } = useGetProductDetails({ id });
  const [quantity, setQuantity] = useState(1);
  const { user } = useCurrentUser();

  return {
    data,
    isLoading,
    quantity,
    setQuantity,
    user,
  }
}

export default useProductDetail;