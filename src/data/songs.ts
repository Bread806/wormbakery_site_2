// Strudel 歌曲資料
// 使用者之後會以檔案提供歌曲，目前先放 2 首範例作為接口

export interface Song {
  id: string;
  title: string;
  description?: string;
  code: string;  // Strudel 程式碼
}

export const SONGS: Song[] = [
  {
    id: 'demo-1',
    title: 'Demo Groove',
    description: 'Strudel 基礎節奏範例',
    code: `s("bd sd").fast(2)`,
  },
  {
    id: 'demo-2',
    title: 'Demo Melody',
    description: '簡單旋律範例',
    code: `note("c2 e2 g2").s("sawtooth")`,
  },
];
