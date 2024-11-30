import API from ".";

import {
  GetProductParams,
  GetProductDetailsParams,
  GetProductDetailsResponse,
  GetProductResponse,
  PostProductToCartRequest,
  PostProductToCartResponse,
} from "@/app/product/api/interface";

import {
  GetCartResponse,
  PutCartUpdateRequest,
  PutCartUpdateResponse,
  DeleteCartItemRequest,
  DeleteCartItemResponse,
} from "@/app/cart/api/interface";

export const getProducts = async (
  params: GetProductParams
): Promise<GetProductResponse> => {
  const response = await API.get<GetProductResponse>("/products", { params });

  return response.data;
};

export const getProductDetails = async (
  params: GetProductDetailsParams
): Promise<GetProductDetailsResponse> => {
  const response = await API.get<GetProductDetailsResponse>(
    "/products/details",
    { params }
  );

  return response.data;
};

export const postProductToCart = async (
  data: PostProductToCartRequest
): Promise<PostProductToCartResponse> => {
  const response = await API.post<PostProductToCartResponse>("/cart", data);

  return response.data;
};

export const getCart = async (): Promise<GetCartResponse> => {
  const response = await API.get<GetCartResponse>("/cart");

  return response.data;
};

export const putCartUpdate = async (
  data: PutCartUpdateRequest
): Promise<PutCartUpdateResponse> => {
  const response = await API.put<PutCartUpdateResponse>("/cart", data);

  return response.data;
};

export const deleteCartItem = async (
  data: DeleteCartItemRequest
): Promise<DeleteCartItemResponse> => {
  const response = await API.delete<DeleteCartItemResponse>("/cart", { data });

  return response.data;
};