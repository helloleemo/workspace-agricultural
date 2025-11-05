import { CartIcon, MenuIcon } from '@/components/icon';
import Link from 'next/link';

const itemList = [
  { name: '農產品', href: '/products' },
  { name: '訂單查詢', href: '/orders' },
  { name: '登入/註冊', href: '/login' },
  { name: '聯絡我們', href: '/contact' },
];

export const Header = () => {
  return (
    <div className="w-full flex fixed top-0  z-20 justify-between items-center bg-neutral-900 opacity-80 px-10 py-3 ">
      <div className="logo border text-white mx-auto sm:mx-0">
        <p className=" p-2">梅logo</p>
      </div>
      <div className="menu">
        <div className="text-white  sm:hidden cursor-pointer  p-2 rounded-md">
          <MenuIcon className="w-8 h-8" />
        </div>
        <ul className="hidden sm:flex gap-5 item-center">
          {itemList.map((item) => (
            <li key={item.name} className="text-white text-sm">
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
          <li className="text-white">
            <CartIcon className="w-5 h-5" />
          </li>
        </ul>
      </div>
    </div>
  );
};
