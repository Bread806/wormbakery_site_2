// 品牌資料層：卡蚯蚓（作者本人）與蚯蚓麵包屋（作品計畫）
// 切換時僅改變 logo、大頭貼、文案、作品歸屬標籤，視覺排版保持不變

export interface Brand {
  key: 'kacha' | 'worm';
  label: string;
  logo: string;          // 導航與 hero 的標識圖
  logoAlt: string;
  avatar: string;        // Profile 主視覺
  avatarAlt: string;
  heroTitle: string;
  tagline1: string;
  tagline2: string;
  profileIntro: string[];  // 關於我區塊的段落
  metaTitle: string;
  metaDescription: string;
  workOwnershipNote: string;  // Works 頁的品牌歸屬說明
}

const GOOGLE_DOC_PARAMS = '?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true';

export const BRANDS: Record<'kacha' | 'worm', Brand> = {
  kacha: {
    key: 'kacha',
    label: '卡蚯蚓',
    logo: '/pic/profile_1.png',          // 卡蚯蚓用頭像作為 logo
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
    workOwnershipNote: '目前所有作品皆屬於卡蚯蚓。蚯蚓麵包屋為實驗台本計畫，尚未獨立發表作品。',
  },
  worm: {
    key: 'worm',
    label: '蚯蚓麵包屋',
    logo: '/pic/bread-svgrepo-com_2.svg', // 麵包屋用麵包 SVG 作為 logo
    logoAlt: '蚯蚓麵包屋 logo',
    avatar: '/pic/text_white.png',        // 麵包屋主視覺用文字圖
    avatarAlt: '蚯蚓麵包屋主視覺',
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

export const BRAND_KEYS = Object.keys(BRANDS) as Array<keyof typeof BRANDS>;
export const DEFAULT_BRAND: keyof typeof BRANDS = 'kacha';

export function getUrlForDoc(docId: string): string {
  return `https://docs.google.com/document/d/${docId}/edit${GOOGLE_DOC_PARAMS}`;
}
