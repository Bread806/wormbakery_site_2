// 品牌資料：卡蚯蚓（主站）+ 蚯蚓麵包屋（子頁面 /wormbakery/）
// 不再支援即時品牌切換，麵包屋為獨立頁面

export const BRANDS = {
  kacha: {
    key: 'kacha' as const,
    label: '卡蚯蚓',
    logo: '/pic/profile_1.png',
    logoAlt: '卡蚯蚓大頭貼',
    avatar: '/pic/profile_1.png',
    avatarAlt: '卡蚯蚓的個人圖像',
    heroTitle: '卡蚯蚓',
    tagline1: 'To find the perfect words.',
    tagline2: 'To say less but to say more.',
    profileIntro: [
      '我叫做卡蚯蚓，可以稱呼我蚯蚓就好。喜歡寫作與編劇，同時也是喜歡各種聲音表演的聽眾。在網路上發表與撰寫短篇語音、長篇音聲作品與情境劇台本。在這個網站裡，你可以看到我曾參與過的作品以及我練習的文本。',
      '蚯蚓麵包屋是一個我用來發表實驗性質作品的計畫，多數作品會免費發表讓表演者練習。作品發表的頻率不固定，不過都會是我覺得富有意義的創作。',
      '聯絡台本委託可以見 Official SNS 頁面。委託會先經過一輪需求討論才會確認是否承接，造成不便請見諒。',
    ],
    metaTitle: '卡蚯蚓的個人網站',
    metaDescription: '卡蚯蚓的個人作品集：寫作、編劇、音聲台本與 VTuber Staff 相關作品。',
    workOwnershipNote: '所有作品皆屬於卡蚯蚓。蚯蚓麵包屋為實驗台本計畫。',
  },
  worm: {
    key: 'worm' as const,
    label: '蚯蚓麵包屋',
    logo: '/pic/bakery-icon.png',
    logoAlt: '蚯蚓麵包屋 logo',
    avatar: '/pic/bakery-logo-white.png',
    avatarAlt: '蚯蚓麵包屋標準字',
    heroTitle: '蚯蚓麵包屋',
    tagline1: 'To find the perfect words.',
    tagline2: 'To say less but to say more.',
    profileIntro: [
      '蚯蚓麵包屋是一個我用來發表實驗性質作品的計畫，多數作品會免費發表讓表演者練習。作品發表的頻率不固定，不過都會是我覺得富有意義的創作。',
      '在這裡，你可以找到適合練習的公開台本與各種實驗性文本。',
      '若你是表演者，歡迎使用這些台本進行練習；公開發表前請先取得同意。聯絡方式請見 Official SNS 頁面。',
    ],
    metaTitle: '蚯蚓麵包屋',
    metaDescription: '蚯蚓麵包屋：免費公開台本與實驗性音聲作品計畫。',
    workOwnershipNote: '蚯蚓麵包屋目前無獨立發表作品，所有作品請至卡蚯蚓頁面查看。',
  },
};

export const DEFAULT_BRAND = 'kacha';

const GOOGLE_DOC_PARAMS = '?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true';

export function getUrlForDoc(docId: string): string {
  return `https://docs.google.com/document/d/${docId}/edit${GOOGLE_DOC_PARAMS}`;
}
