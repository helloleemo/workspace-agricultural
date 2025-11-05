import { FadeCarousel } from '@/components/FadeCarousel';

export const metadata = {
  title: 'Agricultural Site',
  description: 'About our agricultural site',
};

// const content = {
//   title: '農產品網頁',
//   description:
//     '提供最新鮮的農產品，直接從農場到您的餐桌，支持本地農業，享受健康生活。',
// };

export default function Index() {
  return (
    <div>
      {/* 主圖 */}
      <div className="border">
        <div className="text-center py-10 absolute top-1/4 left-0 w-full z-10">
          <h1 className='text-3xl font-bold text-white'>農產品網頁</h1>
          <p className='text-lg text-white'>提供最新鮮的農產品，直接從農場到您的餐桌，支持本地農業，享受健康生活。</p>
        </div>
        <FadeCarousel />
      </div>
    </div>
  );
}
