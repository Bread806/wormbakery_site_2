// SNS 社群連結資料

export interface SnsLink {
  id: string;
  name: string;
  /** 顯示用的帳號文字（無連結的卡片也會顯示） */
  handle: string;
  /** 顯示用說明；空字串 = 不顯示 */
  description: string;
  /** 主要連結；空字串 = 不顯示按鈕 */
  url: string;
  /** 同一張卡內的次要連結（例如同一人的另一個帳號） */
  extra?: { handle: string; url: string };
  color: 'cyan' | 'pink' | 'lime';
}

export const SNS_LINKS: SnsLink[] = [
  {
    id: 'twitter',
    name: 'Twitter(X)',
    handle: '@bread_sk8',
    description: '',
    url: 'https://x.com/bread_sk8',
    extra: { handle: '@wormbakery', url: 'https://x.com/wormbakery' },
    color: 'cyan',
  },
  {
    id: 'discord',
    name: 'Discord',
    handle: '@bread_sk8',
    description: '緊急的事情可以用dc聯絡，非緊急建議使用信箱詢問。',
    url: '',
    color: 'pink',
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'wormbakery@gmail.com',
    description: '工作聯絡事宜請透過信箱聯繫！',
    url: '',
    color: 'lime',
  },
];

export const SNS_INTRO = '合作、委託，或是台本使用相關授權相關事宜，歡迎使用以下社群連結與我聯絡。';
export const SNS_FOOTER = '期待收到您的聯繫';
export const FOOTER_CREDIT = 'Powered by Bread_sk8';

export const GITHUB_REPO_URL = 'https://github.com/Bread-ou/wormbakery_site_2';
