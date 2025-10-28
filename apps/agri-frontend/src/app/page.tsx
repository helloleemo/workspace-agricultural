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
        <div className="grid sm:grid-cols-2 grid-cols-1">
          {/* 特色1 */}
          <div className="w-full sm:order-1 sm:col-span-1 col-span-2 order-1">
            <Image
              className="object-cover sm:h-[50vh] h-[350px] w-full"
              src="/img/img01.png"
              alt="Introduction 1"
              width={400}
              height={350}
            />
          </div>
          <div className="w-full bg-neutral-100 sm:order-2 sm:col-span-1 col-span-2 order-2">
            <div className="p-10 flex flex-col justify-center items-center h-full">
              <p className="font-bold text-lg">這是介紹區塊</p>
              <p className="w-[300px] text-center text-xs pt-3 ">
                這是介紹區塊的詳細內容，這是介紹區塊的詳細內容
              </p>
            </div>
          </div>
          {/* 特色2 */}
          <div className="w-full bg-neutral-100 sm:order-3 sm:col-span-1 col-span-2 order-4">
            <div className="p-10 flex flex-col justify-center items-center h-full ">
              <p className="font-bold text-lg">這是介紹區塊</p>
              <p className="w-[300px] text-center text-xs pt-3 ">
                這是介紹區塊的詳細內容，這是介紹區塊的詳細內容
              </p>
            </div>
          </div>
          <div className="w-full sm:order-4 order-3 sm:col-span-1 col-span-2">
            <Image
              className="object-cover sm:h-[50vh] h-[350px] w-full"
              src="/img/img01.png"
              alt="Introduction 1"
              width={400}
              height={350}
            />
          </div>
          {/* 特色3 */}
          <div className="border border-red-500 w-full col-span-2 order-4">
            <div className="p-10 flex flex-col justify-center items-center h-full ">
              <p className="font-bold text-lg">這是介紹區塊</p>
              <p className="w-[300px] text-center text-xs pt-3  ">
                這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容
              </p>
            </div>
          </div>
          {/* 特色4 - 預定流程 */}
          <div className="border border-red-500 w-full col-span-2 ">
            <div className="p-10 flex flex-col justify-center items-center h-full ">
              <p className="font-bold text-lg">這是介紹區塊</p>
              <p className="w-[300px] text-center text-xs pt-3  ">
                這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容
              </p>
              <div className="w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
