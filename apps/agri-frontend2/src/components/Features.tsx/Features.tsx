import Image from 'next/image';

export const Features = () => {
  // const FeaturesContent: Array<{
  //   title?: string;
  //   description?: string;
  //   imgUrl?: string;
  //   alt?: string;
  //   smOrder: number;
  //   order: number;
  //   colSpan: boolean;
  // }> = [
  //   {
  //     title: '這是介紹區塊',
  //     description: '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容',
  //     imgUrl: '/img/img01.png',
  //     alt: 'Introduction 1',
  //     smOrder: 1,
  //     order: 1,
  //     colSpan: false,
  //   },
  //   {
  //     title: '這是介紹區塊',
  //     description: '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容',
  //     imgUrl: '/img/img02.png',
  //     alt: 'Introduction 2',
  //     smOrder: 1,
  //     order: 1,
  //     colSpan: false,
  //   },
  //   {
  //     title: '這是介紹區塊',
  //     description:
  //       '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容',
  //     imgUrl: '/img/img03.png',
  //     smOrder: 1,
  //     order: 1,
  //     colSpan: false,
  //   },
  //   {
  //     title: '這是介紹區塊',
  //     description:
  //       '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容',
  //     imgUrl: '/img/img04.png',
  //     alt: 'Introduction 4',
  //     smOrder: 1,
  //     order: 1,
  //     colSpan: false,
  //   },
  // ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {/* 特色1 */}
      <div className="order-1 col-span-2 w-full sm:order-1 sm:col-span-1">
        <Image
          className="h-[350px] w-full object-cover sm:h-[50vh]"
          src="/img/img01.png"
          alt="Introduction 1"
          width={400}
          height={350}
        />
      </div>
      <div className="order-2 col-span-2 w-full bg-neutral-100 sm:order-2 sm:col-span-1">
        <div className="flex h-full flex-col items-center justify-center p-10">
          <p className="text-lg font-bold">這是介紹區塊</p>
          <p className="w-[300px] pt-3 text-center text-xs">
            這是介紹區塊的詳細內容，這是介紹區塊的詳細內容
          </p>
        </div>
      </div>
      {/* 特色2 */}
      <div className="order-4 col-span-2 w-full bg-neutral-100 sm:order-3 sm:col-span-1">
        <div className="flex h-full flex-col items-center justify-center p-10">
          <p className="text-lg font-bold">這是介紹區塊</p>
          <p className="w-[300px] pt-3 text-center text-xs">
            這是介紹區塊的詳細內容，這是介紹區塊的詳細內容
          </p>
        </div>
      </div>
      <div className="order-3 col-span-2 w-full sm:order-4 sm:col-span-1">
        <Image
          className="h-[350px] w-full object-cover sm:h-[50vh]"
          src="/img/img01.png"
          alt="Introduction 1"
          width={400}
          height={350}
        />
      </div>
      {/* 特色3 */}
      <div className="order-4 col-span-2 w-full border border-red-500">
        <div className="flex h-full flex-col items-center justify-center p-10">
          <p className="text-lg font-bold">這是介紹區塊</p>
          <p className="w-[300px] pt-3 text-center text-xs">
            這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容
          </p>
        </div>
      </div>
      {/* 特色4 - 預定流程 */}
      <div className="col-span-2 w-full border border-red-500">
        <div className="flex h-full flex-col items-center justify-center p-10">
          <p className="text-lg font-bold">這是介紹區塊</p>
          <p className="w-[300px] pt-3 text-center text-xs">
            這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容，這是介紹區塊的詳細內容
          </p>
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
};
