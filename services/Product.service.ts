import API from ".";

import {
  GetProductParams,
  GetProductDetailsParams,
  GetProductDetailsResponse,
  GetProductResponse,
} from "@/app/product/api/interface";

export const getProducts = async (params: GetProductParams): Promise<GetProductResponse> => {
  const response = await API.get<GetProductResponse>("/products", { params });

  return response.data;
}

export const getProductDetails = async (params: GetProductDetailsParams): Promise<GetProductDetailsResponse> => {
  const response = await API.get<GetProductDetailsResponse>("/products/details", { params });

  return response.data;
}