export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p>Products</p>
      {children}
    </div>
  );
}

// export default function ProductsLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <section>
//       <h2>Products</h2>
//       {children}
//     </section>
//   );
// }
