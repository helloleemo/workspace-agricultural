import { z } from 'zod';

const productTypeSchema = z.object({
  type: z.string().min(1, '類型必填'), // 必填
  price: z.number().int().positive('價格必須大於0'), // 必填
  stock: z.number().int().nonnegative(), // 必填
});

const productCreateSchema = z.object({
  name: z.string().min(1, '產品名稱必填'),
  description: z.string().optional().default(''),
  mainImage: z.string(),
  detailImages: z.array(z.string()).optional().default([]),
  productTypes: z.array(productTypeSchema).min(1, '至少要有一個類型'), // 必填且至少一個
});

const productUpdateSchema = productCreateSchema.partial();

export { productTypeSchema, productUpdateSchema, productCreateSchema };
