import Image from 'next/image';

export const Features = () => {
  const FeaturesContent: Array<{
    title?: string;
    description?: string;
    imgUrl?: string;
    alt?: string;
    smOrder: number;
    order: number;
    colSpan: boolean;
  }> = [
    {
      title: '這是介紹區塊',
      description: '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容',
      imgUrl: '/img/img01.png',
      alt: 'Introduction 1',
      smOrder: 1,
      order: 1,
      colSpan: false,
    },
    {
      title: '這是介紹區塊',
      description: '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容',
      imgUrl: '/img/img02.png',
      alt: 'Introduction 2',
      smOrder: 1,
      order: 1,
      colSpan: false,
    },
    {
      title: '這是介紹區塊',
      description:
        '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容',
      imgUrl: '/img/img03.png',
      smOrder: 1,
      order: 1,
      colSpan: false,
    },
    {
      title: '這是介紹區塊',
      description:
        '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容',
      imgUrl: '/img/img04.png',
      alt: 'Introduction 4',
      smOrder: 1,
      order: 1,
      colSpan: false,
    },
  ];
  return (
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
  );
};
