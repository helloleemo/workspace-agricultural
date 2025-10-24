'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Product, CreateProductData, UpdateProductData } from '@/types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (data: CreateProductData) => {
    try {
      const newProduct = await apiClient.createProduct(data);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create product');
    }
  };

  const updateProduct = async (id: number, data: UpdateProductData) => {
    try {
      const updatedProduct = await apiClient.updateProduct(id, data);
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? updatedProduct : product
        )
      );
      return updatedProduct;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await apiClient.deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}