async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/products`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-2">
        {products.map((p: any) => (
          <li key={p.id} className="p-3 border rounded">
            <div className="font-semibold">{p.name}</div>
            <div>${p.price}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
