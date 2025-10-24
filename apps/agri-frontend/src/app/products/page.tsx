'use client';

import { useProducts } from '@/hooks/useProducts';
import { useState } from 'react';

export default function ClientProductsPage() {
  const { products, loading, error, createProduct, deleteProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ name: '', price: 0 });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create product');
    }
  };

  if (loading) return <div className="p-4">載入中...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">產品管理（客戶端版本）</h1>
      
      {/* 新增產品表單 */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">新增產品</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="產品名稱"
            value={newProduct.name}
            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="價格"
            value={newProduct.price || ''}
            onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
            className="border rounded px-3 py-2"
            min="0"
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          新增產品
        </button>
      </form>

      {/* 產品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">NT$ {product.price}</p>
            <button
              onClick={() => deleteProduct(product.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              刪除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}