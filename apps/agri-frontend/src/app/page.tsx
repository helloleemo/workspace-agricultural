import { Features } from '@/components/Features.tsx';
import { IconList } from '@/components/IconList.tsx';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const metadata = {
  title: 'Agricultural Site',
  description: 'About our agricultural site',
};

const content = {
  title: '農產品網頁',
  description:
    '提供最新鮮的農產品，直接從農場到您的餐桌，支持本地農業，享受健康生活。',
};

export default function Index() {
  return (
    <>
      {/* 主圖 */}
      <div className="relative w-full -z-10">
        <Image
          className="object-cover h-[100vh] w-full flex flex-col items-center justify-center gap-5"
          src="/img/main.png"
          alt="Agricultural site"
          width={400}
          height={350}
        />
        <div className="alpha bg-neutral-900 opacity-60 absolute inset-0 z-10"></div>
        {/* 主敘述 */}
        <div className="sm:w-[420px] w-[80vw] leading-relaxed absolute inset-1/2 -translate-x-1/2 z-20 flex flex-col gap-5 items-center justify-center text-white text-center px-5">
          <p className="font-bold text-2xl sm:text-3xl">{content.title}</p>
          <p className="text-sm">{content.description}</p>
          <Button variant="outline" className="w-[220px] mt-4">
            立即預定
          </Button>

          {/* 最新消息 */}
          <div className="pt-10">
            <IconList title="最新消息" theme="light" />
          </div>
        </div>
      </div>
      {/* 介紹區塊 */}
      <div>
        <Features />
      </div>
    </>
  );
}
