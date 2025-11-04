import { apiClient } from '@/lib/api';
import { use } from 'react';

export default function ProductPage() {
  const content: { products: string; product: string } = {
    products: '',
    product: '',
  };
  const getProduct = async () => {
    try {
      const products = await apiClient.getProducts();
      content.products = products.toString();
      const product = await apiClient.getProduct('uuid-005');
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
