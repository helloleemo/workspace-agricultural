import { z } from 'zod';

const orderItemInput = z.object({
  productTypeId: z.string().min(1),
  quantity: z.number().int().positive('數量必須大於0'),
  price: z.number().nonnegative(),
});

const createOrderInput = z.object({
  couponId: z.string().optional().nullable(),
  deliverType: z.enum(['home_delivery', 'store_pickup']),
  paymentType: z.enum(['atm_transfer']),
  items: z.array(orderItemInput).min(1),
  // 宅配
  shippingAddress: z.string().optional(),
  receiverName: z.string().optional(),
  receiverPhone: z.string().optional(),
  // 取貨
  customerName: z.string().min(1, '客戶姓名必填'),
  customerEmail: z.string().email('無效的電子郵件地址'),
  customerPhone: z.string().min(1, '客戶電話必填'),
});

// const listOrdersQuery = z.object({
//   page: z.coerce.number().int().positive().default(1).optional(),
//   pageSize: z.coerce.number().int().positive().max(100).default(100).optional(),
//   status: z
//     .enum([
//       'created',
//       'pending',
//       'paid',
//       'refunded',
//       'in_progress',
//       'completed',
//       'cancelled',
//     ])
//     .optional(),
//   userId: z.string().optional(), // 僅 SUPERUSER 可用
// });

// const updateStatusInput = z.object({
//   status: z.enum([
//     'pending',
//     'paid',
//     'refunded',
//     'in_progress',
//     'completed',
//     'cancelled',
//   ]),
// });

const atmConfirmInput = z.object({
  lastFive: z.string().regex(/^\d{5}$/, '需為 5 位數字'),
});

export {
  createOrderInput,
  // listOrdersQuery,
  // updateStatusInput,
  atmConfirmInput,
};
