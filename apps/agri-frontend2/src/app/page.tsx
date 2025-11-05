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
        <FadeCarousel />
      </div>
    </div>
  );
}
