'use client';
import { apiClient } from '@/lib/api';

export default function ProductPage() {
  const content: { products: string; product: string } = {
    products: '',
    product: '',
  };
  const getProduct = async () => {
    try {
      const products = await apiClient.getProducts();
      content.products = products.toString();
      const product = await apiClient.getProduct(
        '858c2125-fa50-40da-b4c3-ce2bb74329ed',
      );
      content.product = product.toString();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5">
      <p>Products</p>
      <button onClick={getProduct}>Get all products</button>
      <div>{content.product}</div>
      <div>{content.products}</div>
    </div>
  );
}
