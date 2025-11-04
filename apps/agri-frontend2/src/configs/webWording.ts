
export const webWordingConfigs = {
  rootLayout: {
    header: {
      itemList: [
        { name: '農產品', href: '/products' },
        { name: '訂單查詢', href: '/orders' },
        { name: '登入/註冊', href: '/login' },
        { name: '聯絡我們', href: '/contact' },
      ],
      logo:{
        altText: '梅logo',
        img: '/img/logo.png',
      }
    }
  },
  indexPage:{
    metaData:{
        title: 'Agricultural Site',
        description: 'About our agricultural site',
    },
    FadeCarouselImg:[
      { src: "/img/img01.png", alt: "Abstract Image 1" },
      { src: "/img/img02.png", alt: "Abstract Image 2" },
      { src: "/img/img03.png", alt: "Abstract Image 3" }
    ]

  }

}
