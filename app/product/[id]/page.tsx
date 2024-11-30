"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import useProductDetail from "../hooks/useProductDetail";
import { formatCurrency } from "@/lib/formatCurrency";
import { useNavLayout } from "@/components/Layouts/hooks/useNavLayout";
import { useAddProduct } from "../hooks/useAddProduct";

import { Skeleton } from "@/components/ui/skeleton";
import { DynamicButton } from "@/components/DynamicButton";
import { Badge } from "@/components/ui/badge";
import { AuthDialog } from "@/components/CustomDialog/AuthDialog";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, quantity, setQuantity, user } = useProductDetail({
    id: id as string,
  });
  const { handleOpenLogin, openLogin, handleOpenSignup, openSignup } = useNavLayout();
  const { handleAddToCart } = useAddProduct();

  return (
    <div className="pt-32 pb-12 px-4 md:px-8">
      {isLoading ? (
        <>
          <h1 className="text-48 font-bold">Product Details.</h1>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <Image
                src={data?.imageUrl || ""}
                alt={data?.name || ""}
                width={400}
                height={400}
                className="rounded-md w-[500px] h-[500px] object-cover"
              />
            </div>
            <div className="relative">
              <div className="flex flex-col space-y-3">
                <h1 className="text-48 font-bold">{data?.name}</h1>
                <p className="text-16">{data?.description}</p>
                <div className="flex">
                  <Badge className="bg-primary font-semibold text-black text-14 hover:bg-primary-foreground">
                    {formatCurrency(data?.price ?? 0)}
                  </Badge>
                </div>
              </div>

              {/* @TODO: Stock Quantity, Counter, Add to Cart */}
              <div className="flex flex-col h-full pt-4">
                <span className="text-16">Stock: {data?.quantity}</span>

                <div className="flex items-center gap-4 py-4">
                  <button
                    className="px-3 py-1 border rounded-md"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="text-16">{quantity}</span>
                  <button
                    className="px-3 py-1 border rounded-md"
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(data?.quantity || 1, prev + 1)
                      )
                    }
                    disabled={quantity >= (data?.quantity || 1)}
                  >
                    +
                  </button>
                </div>

                <DynamicButton
                  className="w-full md:w-10/12"
                  title="Add to Cart"
                  onClick={() => {
                    if (!user) {
                      handleOpenLogin(true);
                      return;
                    }
                    handleAddToCart(id as string ?? "", quantity);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <AuthDialog
        open={openLogin}
        onOpenChange={handleOpenLogin}
        type="login"
        title="Login To Start Shopping In Blüte"
        description="Login to your account"
        changeType={() => {
          handleOpenLogin(false);
          handleOpenSignup(true);
        }}
      />

      <AuthDialog
        open={openSignup}
        onOpenChange={handleOpenSignup}
        type="signup"
        title="Sign Up"
        description="Create an account"
        changeType={() => {
          handleOpenSignup(false);
          handleOpenLogin(true);
        }}
      />
    </div>
  );
}
