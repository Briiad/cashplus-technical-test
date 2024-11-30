export interface GetProductParams {
  offset: number
  limit: number
}

export interface GetProductResponse {
  total: number
  offset: number
  limit: number
  products: Products[]
}

export interface Products {
  id: string
  name: string
  price: number
  description: string
  quantity: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export interface GetProductDetailsParams {
  id: string
}

export interface GetProductDetailsResponse {
  id: number
  name: string
  price: number
  description: string
  quantity: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export interface PostProductToCartRequest {
  productId: string
  quantity: number
}

export interface PostProductToCartResponse {
  message: string
}