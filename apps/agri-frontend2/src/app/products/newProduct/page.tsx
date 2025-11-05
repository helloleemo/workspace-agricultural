'use client';
import { useState } from 'react';
import { apiClient } from '@/lib/api';

export default function NewProductPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    mainImage: '',
    detailImages: '',
    productTypes: '',
  });
  const [result, setResult] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // productTypes 欄位格式: [{"type":"大箱","price":500,"stock":10}]
      const productTypes = JSON.parse(form.productTypes || '[]');
      const detailImages = form.detailImages
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await apiClient.createProduct({
        name: form.name,
        description: form.description,
        mainImage: form.mainImage,
        detailImages,
        productTypes,
      });
      setResult('新增成功: ' + JSON.stringify(res));
    } catch (err) {
      setResult('新增失敗: ' + err);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-5">
      <h2 className="mb-4 text-xl font-bold">新增產品</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="產品名稱"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          placeholder="產品描述"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="mainImage"
          placeholder="主圖網址"
          value={form.mainImage}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="detailImages"
          placeholder="細節圖網址（用逗號分隔）"
          value={form.detailImages}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="productTypes"
          placeholder='產品類型（JSON格式，例如：[{"type":"大箱","price":500,"stock":10}])'
          value={form.productTypes}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          新增產品
        </button>
      </form>
      <div className="mt-4 text-sm">{result}</div>
    </div>
  );
}
