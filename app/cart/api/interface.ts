export interface GetCartResponse {
  items: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
      imageUrl: string
    }
    createdAt: string;
    updatedAt: string;
  }[]
}

export interface PutCartUpdateRequest {
  id: string;
  quantity: number;
}

export interface PutCartUpdateResponse {
  message: string;
}

export interface DeleteCartItemRequest {
  id: string;
}

export interface DeleteCartItemResponse {
  message: string;
}