import { useState, useMemo } from "react";
import { useGetProducts } from "../api/queries";
import { GetProductResponse, Products } from "../api/interface";

interface UseProductsProps {}

const useProducts = (props: UseProductsProps) => {
  const {} = props;
  const [filter, setFilter] = useState({
    limit: 10,
    offset: 0,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetProducts(filter);

  const reducedData = useMemo(() => {
    if (!data) return [];
    return data.pages.reduce<Products[]>((acc, page) => {
      return [...acc, ...page.products];
    }, []);
  }, [data]);

  return {
    data: reducedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    setFilter,
  }
}

export default useProducts;