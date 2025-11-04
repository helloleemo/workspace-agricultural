import { CalendarIcon, PackageIcon, TruckIcon } from '@/components/icon';

const wordingContent = {
  indexPage: {
    mainSection: {
      title: '農產品網頁',
      description: '提供最新鮮的農產品，直接從農場到您的餐桌，支持本地農業，享受健康生活。',
    },
    introSection: {
      title: '介紹區塊',
      description:
        '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容。這是介紹區塊的詳細內容，這是介紹區塊的詳細內容。',
    },
    featureSection: [
      {
        title: '新鮮直送',
        description: '我們的農產品直接從農場送到您的餐桌，確保新鮮美味。',
        img: '/img/img01.png',
      },
      {
        title: '有機認證',
        description: '我們的農產品均通過有機認證，讓您吃得安心。',
        img: '/img/img01.png',
      },
    ],
    introSection2: {
      title: '介紹區塊2',
      description:
        '這是介紹區塊的詳細內容，這是介紹區塊的詳細內容。這是介紹區塊的詳細內容，這是介紹區塊的詳細內容。',
    },
    processes: [
      {
        title: '訂購',
        description: '選擇您喜愛的農產品並下單。',
        icon: CalendarIcon,
      },
      {
        title: '打包',
        description: '我們會精心打包您的訂單，確保產品完好無損。',
        icon: PackageIcon,
      },
      {
        title: '到府',
        description: '快速將新鮮的農產品送到您手中。',
        icon: TruckIcon,
      },
    ],
  },
};

export { wordingContent };
