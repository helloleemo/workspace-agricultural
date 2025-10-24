import { prisma } from '@/server/db';
async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <main className="p-6">
      <h1 className="text-5xl font-bold mb-4 text-red-500">農產品</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-green-600 font-bold">NT$ {product.price}</p>
            <p className="text-sm text-gray-500">
              建立時間: {new Date(product.createdAt).toLocaleDateString('zh-TW')}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}