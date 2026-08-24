// 合輯資料：蚯蚓麵包屋的「專輯」結構
// 每張合輯 (album) 含多個曲目 (track)，用於首頁 TV 轉台檢視窗

export interface Track {
  id: string;                    // 曲目代號，如 'a', 'b', 'c'
  title: string;                 // 曲目完整標題
  description: string;           // 簡述（顯示在右下角 dialog）
  link?: string;                 // Google Doc 連結（文本）
  release?: string;              // YouTube 連結（聆聽）
  image?: string;                // 曲目封面圖
  credits?: { role: string; name: string }[]; // 製作名單
}

export interface Album {
  id: string;                    // 合輯代號，如 'A', 'B', 'coming'
  title: string;                 // 合輯標題
  coverImage: string;            // 專輯封面（顯示在電視螢幕上）
  tracks: Track[];
}

// 現有作品連結 (works.ts 中提取出來方便共用)
const DOC_PARAMS = '?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true';

export const ALBUMS: Album[] = [
  {
    id: 'A',
    title: '依賴型戀愛症候群',
    coverImage: '/work_pic/work_doctor.jpeg',  // 借用現有作品圖當測試封面
    tracks: [
      {
        id: 'a',
        title: '病',
        description: '一位姊姊常常來看診，她發現與她談了戀愛的故事。',
        link: `https://docs.google.com/document/d/1XpX_o2pX4xCszo77egUeLnKXoZE7XNhm/edit${DOC_PARAMS}`,
        image: '/work_pic/work_doctor.jpeg',
        credits: [
          { role: '台本', name: '卡蚯蚓' },
        ],
      },
    ],
  },
  {
    id: 'B',
    title: '心之所向',
    coverImage: '/work_pic/work_MRT.jpeg',  // 借用現有作品圖當測試封面
    tracks: [
      {
        id: 'a',
        title: '壽星',
        description: '敬請期待 :D',
        image: '/pic/bakery-icon.png',
      },
      {
        id: 'b',
        title: '捷運忠孝新生站',
        description: '與朋友約在捷運忠孝新生站見面一起去咖啡廳，卻在車站遇見熟人的故事。',
        image: '/work_pic/work_MRT.jpeg',
        credits: [
          { role: '台本', name: '卡蚯蚓' },
        ],
      },
      {
        id: 'c',
        title: '神不在的地方',
        description: '敬請期待 :D',
        image: '/pic/bakery-icon.png',
      },
      {
        id: 'd',
        title: '穿洞',
        description: '敬請期待 :D',
        image: '/pic/bakery-icon.png',
      },
      {
        id: 'e',
        title: '念願',
        description: '敬請期待 :D',
        image: '/pic/bakery-icon.png',
      },
    ],
  },
  {
    id: 'coming',
    title: '敬請期待',
    coverImage: '/pic/bakery-logo-black.png',
    tracks: [
      {
        id: 'a',
        title: '敬請期待',
        description: '敬請期待 :D',
        image: '/pic/bakery-icon.png',
      },
    ],
  },
];
