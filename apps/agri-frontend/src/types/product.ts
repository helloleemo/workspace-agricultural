export interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  price: number;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
}