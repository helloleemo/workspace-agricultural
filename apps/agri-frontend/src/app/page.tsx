import { IconList } from '@/components/IconList.tsx';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IntroSection } from '@/components/IntroSection';
import { metadataIndex } from '@/configs/metadata';
import { wordingContent } from '@/configs/wording';

// Meta description for SEO
export const metadata = metadataIndex;

export default function Index() {
  return (
    <>
      {/* 主圖 */}
      <div className="relative w-full -z-10">
        <Image
          className="object-cover h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center gap-5"
          src="/img/main.png"
          alt="Agricultural site"
          width={400}
          height={350}
        />
        <div className="alpha bg-neutral-900 opacity-60 absolute inset-0 z-10"></div>
        {/* 主敘述 */}
        <div className="w-[420px]  leading-relaxed absolute inset-1/2 -translate-x-1/2 z-20 flex flex-col gap-5 items-center justify-center  text-center px-5 z-20">
          <p className="text-white font-bold text-4xl ">
            {wordingContent.indexPage.mainSection.title ?? ''}
          </p>
          <p className="text-xl text-white">
            {wordingContent.indexPage.mainSection.description ?? ''}
          </p>
          <div>
            <Button variant="outline" size="lg" className='bg-transparent text-white w-full hover:bg-white/10'>
              立即預訂
            </Button>
          </div>

          {/* 最新消息 */}
          <div className="pt-10">
            <IconList title="最新消息" theme="light" />
          </div>
        </div>
      </div>
      {/* 介紹區塊 */}
      <IntroSection />
      {/* 其他區塊 */}
              <Image
        className="object-cover h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center gap-5"
        src="/img/img02.png"
        alt="Agricultural site"
        width={400}
        height={350}
        />
        <div className="alpha bg-neutral-900 opacity-60  inset-0 z-10"></div>
        {/* 主敘述 */}
        <div className="w-[420px]  leading-relaxed  inset-1/2 -translate-x-1/2  flex flex-col gap-5 items-center justify-center  text-center px-5 z-20">
          <p className="text-white font-bold text-4xl ">
            {wordingContent.indexPage.mainSection.title ?? ''}
          </p>
          <p className="text-xl text-white">
            {wordingContent.indexPage.mainSection.description ?? ''}
          </p>
          <div>
            <Button variant="outline" size="lg" className='bg-transparent text-white w-full hover:bg-white/10'>
              立即預訂
            </Button>
          </div>

          {/* 最新消息 */}
          <div className="pt-10">
            <IconList title="最新消息" theme="light" />
          </div>
        </div>
    </>
  );
}
