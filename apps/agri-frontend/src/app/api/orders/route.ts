import { prisma } from '@/server/db';
import { handleApi } from '@/server/handler';
import { logInfo } from '@/server/logger';

// 建立訂單
export const POST = (req: Request) =>
  handleApi('POST /api/orders', async () => {
    logInfo('POST /api/orders', 'Creating new order');

    const body = await req.json();

    // 驗證必要欄位
    if (!body.customerName || !body.customerEmail || !body.customerPhone) {
      throw new Error('validation: Customer information is required');
    }

    if (!body.orderItems || !Array.isArray(body.orderItems) || body.orderItems.length === 0) {
      throw new Error('validation: Order items are required');
    }

    // 使用交易來確保資料一致性
    const order = await prisma.$transaction(async (tx) => {
      // 計算總價並檢查庫存
      let totalPrice = 0;
      const orderItemsData = [];

      for (const item of body.orderItems) {
        const productType = await tx.productType.findUnique({
          where: { id: item.productTypeId },
        });

        if (!productType) {
          throw new Error(`validation: Product type ${item.productTypeId} not found`);
        }

        if (productType.remain < item.quantity) {
          throw new Error(`validation: Insufficient stock for product type ${item.productTypeId}`);
        }

        const itemTotal = productType.price * item.quantity;
        totalPrice += itemTotal;

        orderItemsData.push({
          productTypeId: item.productTypeId,
          quantity: item.quantity,
          price: productType.price,
        });

        // 更新庫存
        await tx.productType.update({
          where: { id: item.productTypeId },
          data: {
            reserved: { increment: item.quantity },
            remain: { decrement: item.quantity },
          },
        });
      }

      // 建立訂單
      const newOrder = await tx.order.create({
        data: {
          customerName: body.customerName,
          customerEmail: body.customerEmail,
          customerPhone: body.customerPhone,
          deliverAddress: body.deliverAddress,
          totalPrice,
          deliverType: body.deliverType || 'home_delivery',
          paymentType: body.paymentType || 'atm_transfer',
          orderItems: {
            create: orderItemsData,
          },
        },
        include: {
          orderItems: {
            include: {
              productType: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      return newOrder;
    });

    logInfo('POST /api/orders', `Created order with id: ${order.id}`);
    return Response.json(order, { status: 201 });
  });