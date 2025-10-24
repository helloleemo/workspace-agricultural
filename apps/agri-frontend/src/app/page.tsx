import Link from "next/link";

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    
    <nav>
      <Link href="/about">關於我們</Link>
      <Link href="/products/list">檢視所有農產品</Link>
      <Link href="/products/list">登入註冊</Link>
      <Link href="/products/list">購物車</Link>
      {/* <Link href="/products/123">Product #123</Link> */}
    </nav>
  );
}
