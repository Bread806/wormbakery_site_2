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

export const ALBUMS: Album[] = [
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
