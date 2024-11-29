"use client";

import useProducts from "./hooks/useProduct";
import InfiniteScroll from "react-infinite-scroll-component";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Product() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useProducts({});

  return (
    <div className="pt-32 pb-12 px-4 md:px-8">
      <h1 className="text-48 font-bold">Our Beloved Products.</h1>
      {data.length === 0 ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="flex justify-center mt-8">
              <Skeleton className="h-12 w-12" />
            </div>
          }
          endMessage={
            <p className="text-center text-16 font-semibold mt-8">
              End of products list.
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12">
            {data.map((product) => (
              <ProductCards
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

interface ProductCardsProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export function ProductCards(props: ProductCardsProps) {
  const { id, name, price, quantity, imageUrl } = props;

  return (
    <Card className="max-h-[350px]">
      <CardContent
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="relative h-[300px] bg-cover bg-center"
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center p-4 text-white">
          <h2 className="text-24 font-semibold">{name}</h2>
          {/* <p className="text-sm">Price: ${price.toFixed(2)}</p>
          <p className="text-sm">Quantity: {quantity}</p> */}
        </div>

        <p className="absolute top-0 right-0 text-12 bg-primary rounded-bl-xl px-2 py-1 font-medium">
          Price: ${price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}
