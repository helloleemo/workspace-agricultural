export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <header>My Header</header>
        <main>{children}</main>
        <footer>© 2025</footer>
      </body>
    </html>
  );
}