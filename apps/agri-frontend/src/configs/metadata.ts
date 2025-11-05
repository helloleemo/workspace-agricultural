const metadataIndex = {
  title: 'Agricultural Site',
  description: 'About our agricultural site',
};

const metadataTemp = {
  title: '農產品網站',
  description: '提供最新鮮的農產品，直接從農場到您的餐桌',
  keywords: ['農產品', '有機蔬果', '本地農業', '健康飲食', '產地直送'],
  openGraph: {
    title: '農產品網站',
    description: '提供最新鮮的農產品，直接從農場到您的餐桌',
    type: 'website',
    url: 'https://yourdomain.com',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '農產品網站主圖',
      },
    ],
    locale: 'zh_TW',
    site_name: '農產品網站',
  },
  twitter: {
    card: 'summary_large_image',
    title: '農產品網站',
    description: '提供最新鮮的農產品，直接從農場到您的餐桌',
    site: '@yourtwitter',
    creator: '@yourtwitter',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
  authors: [{ name: '農產品團隊', url: 'https://yourdomain.com' }],
  creator: '農產品團隊',
  publisher: '農產品團隊',
  robots: 'index, follow',
  language: 'zh-Hant',
};

export { metadataIndex };
