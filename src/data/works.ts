// 作品資料：25 部作品，完整保留原 bundle 連結
// 所有作品目前歸屬卡蚯蚓（brandId: 'kacha'）；未來可將公開台本移到麵包屋

export type WorkCategory = 'script' | 'creation' | 'commission';

export interface Work {
  id: number;
  title: string;
  category: WorkCategory | WorkCategory[];
  description: string;
  link?: string;      // Google Doc 連結
  release?: string;   // YouTube 連結
  image?: string;     // 作品封面圖
  brandId: 'kacha' | 'worm';  // 品牌歸屬（預設全部 'kacha'）
}

const DOC_PARAMS = '?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true';

export const WORKS: Work[] = [
  {
    id: 1,
    title: '我與充滿包容力的姊姊撒嬌日常',
    category: 'script',
    description: '關於姊姊與弟弟偷偷交往，兩人一起躺在床上的聊天談話。',
    link: `https://docs.google.com/document/d/17JbWlSlGdBh07Phic6Ul0LEYKSTeYxId/edit${DOC_PARAMS}`,
    release: 'https://youtu.be/3fhlOxt7Qdo?si=7QlHfcNKhQyUokGZ',
    brandId: 'kacha',
  },
  {
    id: 2,
    title: '白色情人節的加班巧克力',
    category: 'script',
    description: '一個男孩子想在情人節多陪伴加班學姊的故事。',
    link: `https://docs.google.com/document/d/1w0qFdK7Dl5sqE_omB13MdLlJ_gyCIyXI/edit${DOC_PARAMS}`,
    brandId: 'kacha',
  },
  {
    id: 3,
    title: '被教授狠狠的打了耳光',
    category: 'script',
    description: '教授想辦法脅迫學生的故事。',
    link: `https://docs.google.com/document/d/1tenP25mQNddAZnmnbtVY0iaKsMVAT3On/edit${DOC_PARAMS}`,
    release: 'https://youtu.be/Iz8NgZh6skM?si=_trefBTgedkBpJ31',
    brandId: 'kacha',
  },
  {
    id: 4,
    title: '無法逃離獸人姊姊病嬌的愛',
    category: 'script',
    description: '關於一位人類被獸人愛上，被獸人吃死死的故事。',
    link: `https://docs.google.com/document/d/1zTnok8jxem9SyvGPEnubojxhy93pE0VT/edit${DOC_PARAMS}`,
    brandId: 'kacha',
  },
  {
    id: 5,
    title: '等待女朋友回家的時候被姊姊給襲擊了',
    category: 'script',
    description: '關於姊姊想把自己妹妹的男朋友占為己有的故事。',
    link: `https://docs.google.com/document/d/1V2sXyTSFe8GnAR5plV4WDygGwcXH7n68/edit${DOC_PARAMS}`,
    brandId: 'kacha',
  },
  {
    id: 6,
    title: '絲襪日的小確幸',
    category: 'script',
    description: '被無理取鬧的女上司為難的故事',
    link: `https://docs.google.com/document/d/1S_9V9NFi2l9spMULDFDw-Siv0AZrS_hF/edit${DOC_PARAMS}`,
    brandId: 'kacha',
  },
  {
    id: 7,
    title: '我是你的行星環，你永遠當我的太陽，好嗎？（夏季篇）',
    category: ['script', 'creation'],
    description: '與女友在炎熱的屋上親密談話的故事。',
    link: `https://docs.google.com/document/d/1lHbkDro0s-PINt4qaMT_gEeisT3S2cl5/edit${DOC_PARAMS}`,
    release: 'https://youtu.be/P5U56uoFyec?si=M9kX9UaD8I9EZTbO',
    image: '/work_pic/work_id7.jpg',
    brandId: 'kacha',
  },
  {
    id: 8,
    title: '頤指氣使的學妹',
    category: ['script', 'creation'],
    description: '學姊為了能夠準備學測，請學妹來家裡讀書的故事，學妹卻一直威脅她做色色的事。',
    link: `https://docs.google.com/document/d/11egSpT8jzC1Xs7Z4wDW4a6o6i48cZQWQ/edit${DOC_PARAMS}`,
    release: 'https://youtu.be/KVuv_6Em-Xk?si=4RtZsEUTmM3lNabt',
    image: '/work_pic/work_school.jpeg',
    brandId: 'kacha',
  },
  {
    id: 9,
    title: '捷運忠孝新生站',
    category: 'creation',
    description: '與朋友約在捷運忠孝新生站見面一起去咖啡廳，卻在車站遇見熟人的故事。',
    image: '/work_pic/work_MRT.jpeg',
    brandId: 'kacha',
  },
  {
    id: 10,
    title: '鄉間小路與多愁善感的姊姊',
    category: ['script', 'creation'],
    description: '女孩遇見自己深愛的姐姐回家，她發現姊姊在變化太大，姊姊不確定能否再相處起來。',
    link: `https://docs.google.com/document/d/1AYjLeykOJdILUX3rxRYNqRg2kM8YJZR7/edit${DOC_PARAMS}`,
    release: 'https://youtu.be/8pzdFcY7cEU?si=zL1LNF2ndj7CvkXd',
    image: '/work_pic/work_sis.png',
    brandId: 'kacha',
  },
  {
    id: 11,
    title: '紙條',
    category: 'creation',
    description: '男主角暗戀同學了，但他每天都寫紙條塞進他課桌的故事。',
    image: '/work_pic/work_note.jpeg',
    brandId: 'kacha',
  },
  {
    id: 12,
    title: '飛機雲',
    category: 'creation',
    description: '與同學一起放下功課，跟她一起翹課去玩，最後卻在我想跟她一起回家。',
    image: '/work_pic/work_cloud.jpeg',
    brandId: 'kacha',
  },
  {
    id: 13,
    title: '雨季與畢業季',
    category: ['script', 'creation'],
    description: '高中生考上大學後某天待在家裡想讀書，突然被她與她談心。',
    link: `https://docs.google.com/document/d/1XpX_o2pX4xCszo77egUeLnKXoZE7XNhm/edit${DOC_PARAMS}`,
    image: '/work_pic/work_rain.jpeg',
    brandId: 'kacha',
  },
  {
    id: 14,
    title: '依附性戀愛症候群',
    category: 'creation',
    description: '一位姐姐常常來看診，她發現與她談了戀愛的故事。',
    image: '/work_pic/work_doctor.jpeg',
    brandId: 'kacha',
  },
  {
    id: 15,
    title: '你闖進了我的早自習',
    category: 'creation',
    description: '在她早自習睡覺時間醒來後自己在位子上。原本安靜的早晨，因為早起的原因特別安靜，人少的車站只聽見一些鳥叫。',
    image: '/work_pic/work_morning.jpeg',
    brandId: 'kacha',
  },
  {
    id: 16,
    title: '在早餐店睡著了',
    category: 'creation',
    description: '一個早上在早餐店發現一位在睡覺的小店員，引起了她觀察與注意的故事。',
    image: '/work_pic/work_burger.png',
    brandId: 'kacha',
  },
  {
    id: 17,
    title: '令人難以入眠的半夜通話',
    category: ['script', 'creation'],
    description: '傳給女友的訊息，她電話成了自己最想聽見的聲音。',
    link: `https://docs.google.com/document/d/1IOwumirHhDvN3TXqkPMQL2m93Catb6Hg/edit${DOC_PARAMS}`,
    brandId: 'kacha',
  },
  {
    id: 18,
    title: '我才是最特別的納一位',
    category: 'commission',
    description: '一位由愛與依戀混合而成的扭曲故事。',
    release: 'https://youtu.be/ZIVgpsQ8B-U?si=US9_4S-4OuVjWfBd',
    image: '/work_pic/work_narciss.jpg',
    brandId: 'kacha',
  },
  {
    id: 19,
    title: '居酒屋的姊姊似乎討厭下雨天',
    category: 'creation',
    description: '居酒屋姊姊與小女友談起她的往事。',
    release: 'https://youtu.be/H5BQIZOmnuE?si=ziBn8emn_3bwvyhy',
    image: '/work_pic/work_karas.jpg',
    brandId: 'kacha',
  },
  {
    id: 20,
    title: '鼠在不想離開你',
    category: 'commission',
    description: '在情人節裡過意不去的你，被她發現是老鼠與她一起度過的故事。',
    release: 'https://youtu.be/QUgRyT-gGnk?si=pp4meRlyUKl3ShCv',
    image: '/work_pic/work_mouse.jpg',
    brandId: 'kacha',
  },
  {
    id: 21,
    title: 'Love Sick',
    category: 'creation',
    description: '我愛上下雨的聲音，你也愛上了我愛你的聲音，和你一樣。',
    release: 'https://youtu.be/0J5-uTq_Iv8?si=G_DYwHunXyXs4lWM',
    image: '/work_pic/love_sick.png',
    brandId: 'kacha',
  },
  {
    id: 22,
    title: '我們的事',
    category: 'creation',
    description: '這段感情是愛，我都愛你，可以變得這麼好。我們要一直看著我們的故事。',
    release: 'https://youtu.be/7skNvaxGDZ0?si=YB0CxLZYgZAwmikM',
    image: '/work_pic/work_between_us.jpg',
    brandId: 'kacha',
  },
  {
    id: 23,
    title: '巧克力的形狀是IEEE',
    category: 'creation',
    description: '情人節總是在我，所以我一直在著她。',
    release: 'https://youtu.be/m-4WFyJfKJU?si=buAfd2Ub4_Q-4-j_',
    image: '/work_pic/work_chocolate.jpg',
    brandId: 'kacha',
  },
  {
    id: 24,
    title: '慾兔',
    category: 'creation',
    description: '跟 Pekora 做愛了，有一點良心，天天開著的台會很 Pekora，她想都不想可以的。可是就在發表，跟她自己當偶像的男友談起，她卻說沒有，那就？?',
    release: 'https://youtu.be/rUMoPagxK1Q?si=cB-T5g-d6xa5uQIW',
    image: '/work_pic/work_rabbit.jpg',
    brandId: 'kacha',
  },
  {
    id: 25,
    title: '只想要你聽著我',
    category: 'creation',
    description: '這段音聲作品是畢業留下的紀念，你一直都存在著。畢業時代她與她無法忘懷的故事，畢業後的日子卻像一場夢。',
    release: 'https://www.youtube.com/watch?v=05M8vv48VFU&t=1s',
    image: '/work_pic/work_want.jpg',
    brandId: 'kacha',
  },
  {
    id: 26,
    title: '羞澀的新婚之夜～小雪在你懷中低聲呢喃的愛',
    category: 'commission',
    description: 'Project:雪白薄紗｜Voice:小雪Yukichan｜Script:卡蚯蚓',
    release: 'https://www.dlsite.com/maniax/work/=/product_id/RJ01592874.html',
    image: '/work_pic/work_yukichan.png',
    brandId: 'kacha',
  },
];

export const CATEGORIES = [
  { id: 'all' as const, label: '全部' },
  { id: 'script' as const, label: '公開台本' },
  { id: 'creation' as const, label: '創作' },
  { id: 'commission' as const, label: '委託' },
];

export function getWorksByBrand(brandId: 'kacha' | 'worm'): Work[] {
  return WORKS.filter((w) => w.brandId === brandId);
}

export function getWorksByCategory(brandId: 'kacha' | 'worm', category: string): Work[] {
  const brandWorks = getWorksByBrand(brandId);
  if (category === 'all') return brandWorks;
  return brandWorks.filter((w) => {
    const cats = Array.isArray(w.category) ? w.category : [w.category];
    return cats.includes(category as WorkCategory);
  });
}

export function getCategoryLabel(category: WorkCategory | WorkCategory[]): string {
  const labels: Record<WorkCategory, string> = {
    script: '公開台本',
    creation: '創作',
    commission: '委託',
  };
  const cats = Array.isArray(category) ? category : [category];
  const unique = Array.from(new Set(cats.map((c) => labels[c])));
  return unique.join('、');
}

export const USAGE_RULES_URL =
  'https://docs.google.com/document/d/15HFjEE0m5qFX0OtDq1C59SPF5aU3tZHCzPS4GSfDPvQ/edit?usp=sharing';
