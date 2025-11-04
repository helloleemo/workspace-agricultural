import { CartIcon, MenuIcon } from '@/components/icons';
import { webWordingConfigs } from '@/configs/webWording';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className="w-full flex  fixed top-0  z-20 justify-between items-center bg-neutral-900 opacity-80 px-10 py-3 ">
      <div className="logo text-white mx-auto sm:mx-0">
        <Link href="/">
          <p className="border border-white p-2">{webWordingConfigs.rootLayout.header.logo.altText}</p>
        </Link>
      </div>
      <div className="menu">
        <div className="text-white  sm:hidden cursor-pointer border-white border p-2 rounded-md">
          <MenuIcon className="w-8 h-8" />
        </div>
        <ul className="hidden sm:flex gap-5 item-center">
          {webWordingConfigs.rootLayout.header.itemList.map((item) => (
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
