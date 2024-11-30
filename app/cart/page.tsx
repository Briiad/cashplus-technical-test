"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "./hooks/useCart";
import { formatCurrency } from "@/lib/formatCurrency";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Trash2, SaveAll } from "lucide-react";
import { DynamicButton } from "@/components/DynamicButton";
import { cn } from "@/lib/utils";

export default function Cart() {
  const { data, isLoading } = useCart();
  const { user } = useCurrentUser();
  const router = useRouter();

  return (
    <div className="pt-32 pb-12 px-4 md:px-8 grid grid-cols-7 gap-8 bg-[#f0f0f0]">
      <div className="col-span-5 bg-white p-4 md:p-8 rounded-md border border-black/20 drop-shadow-md">
        <h1 className="text-16 md:text-24 lg:text-32 font-bold">Your Cart</h1>
        <div className="flex flex-col space-y-4 mt-4 min-h-[calc(100dvh-16rem)]">
          {!user ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 pt-16">
              <Image
                src="/images/auth_illustration.svg"
                width={200}
                height={200}
                alt="Authentication illustration"
              />
              <p className="text-center text-24 font-bold mt-4">
                Please login to view your cart
              </p>
            </div>
          ) : data?.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 pt-16">
              <Image
                src="/images/cart_illustration.svg"
                width={300}
                height={300}
                alt="Empty cart illustration"
              />
              <p className="text-center text-24 font-bold mt-4">
                Your cart is empty
              </p>
              <DynamicButton
                className="w-64 rounded-none bg-primary"
                title="Start shopping"
                onClick={() => router.push("/product")}
              />
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="w-64 h-64" />
              </div>
              <div>
                <Skeleton className="w-full" />
                <Skeleton className="w-full" />
              </div>
            </div>
          ) : (
            data?.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
                image={item.product.imageUrl}
              />
            ))
          )}
        </div>
      </div>

      <div className="col-span-2 bg-white p-4 rounded-md border border-black/20 drop-shadow-md max-h-[200px] flex flex-col justify-between">
        <div className="flex flex-col space-y-4 ">
          <h2 className="text-14 font-semibold">Amount of payment:</h2>
          <p className="text-24 font-medium">
            {formatCurrency(
              data?.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              ) || 0
            )}
          </p>
        </div>

        <DynamicButton
          className={cn("mt-4 w-full rounded-none bg-slate-900", {
            "cursor-not-allowed": !user || data?.length === 0,
          })}
          disabled={!user || data?.length === 0}
          title="Checkout"
          onClick={() => alert("Checkout button clicked")}
        />
      </div>
    </div>
  );
}

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
}) => {
  const { handleUpdateCart, handleDeleteCartItem } = useCart();
  const [currentQuantity, setCurrentQuantity] = React.useState(quantity);
  const hasChanges = currentQuantity !== quantity;

  const handleIncrement = () => {
    setCurrentQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity((prev) => prev - 1);
    }
  };

  const handleSave = () => {
    handleUpdateCart(id, currentQuantity);
  };

  return (
    <div className="flex items-center justify-between border py-6 px-6 rounded-sm">
      <div className="flex items-center space-x-4">
        <Image
          src={image}
          width={64}
          height={64}
          alt={name}
          className="size-16 object-cover"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-14 font-bold">
            {name} x{quantity}
          </h2>
          <div className="flex items-center gap-4">
            <button onClick={handleDecrement} className="px-2 border rounded">
              -
            </button>
            <span className="text-12 font-medium">{currentQuantity}</span>
            <button onClick={handleIncrement} className="px-2 border rounded">
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge className="text-12 bg-primary hover:bg-primary-foreground">
          {formatCurrency(price * quantity)}
        </Badge>
        {hasChanges && (
          <SaveAll
            className="cursor-pointer text-green-500 size-4"
            onClick={handleSave}
          />
        )}
        <Trash2
          className="cursor-pointer text-red-500 size-4"
          onClick={() => handleDeleteCartItem(id)}
        />
      </div>
    </div>
  );
};
