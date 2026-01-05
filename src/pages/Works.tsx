import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Youtube } from 'lucide-react';

type Category = 'all' | 'creation' | 'script' | 'commission';

interface Work {
  id: number;
  title: string;
  // 可接受單一字串或字串陣列，向下相容
  category: string | string[];
  description: string;
  color: string;
  height: string;
  link?: string;
  release?: string;
  image?: string;
}

// TODO: 將此連結替換為實際的「使用規範文件」網址（例如 Google 文件或站內頁面）
const USAGE_RULES_URL = 'https://docs.google.com/document/d/15HFjEE0m5qFX0OtDq1C59SPF5aU3tZHCzPS4GSfDPvQ/edit?usp=sharing';

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  // 分頁狀態：每次最多顯示 10 筆
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // 當切換分類時重設頁數
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  // 新分類：創作（creation）、公開台本（script）、委託（commission）
  const categories = [
    { id: 'all', label: '全部' },
    { id: 'script', label: '公開台本' },
    { id: 'creation', label: '創作' },
    { id: 'commission', label: '委託' },
  ];

  const works: Work[] = [
    {
      id: 1,
      title: '我與充滿包容力的姊姊撒嬌日常',
      category: 'script',
      description: '關於姊姊與弟弟偷偷交往，兩人一起躺在床上的聊天談話。',
      color: 'from-pink-500 to-purple-600',
      height: 'h-40',
      link: 'https://docs.google.com/document/d/17JbWlSlGdBh07Phic6Ul0LEYKSTeYxId/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true', // 可填入外部連結，例如 'https://example.com/work/1',
      release: 'https://youtu.be/3fhlOxt7Qdo?si=7QlHfcNKhQyUokGZ'

    },
    {
      id: 2,
      title: '白色情人節的加班巧克力',
      category: 'script',
      description: '一個男孩子想在情人節多陪伴加班學姊的故事。',
      color: 'from-cyan-500 to-blue-600',
      height: 'h-40',
      link: 'https://docs.google.com/document/d/1w0qFdK7Dl5sqE_omB13MdLlJ_gyCIyXI/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
    },
    {
      id: 3,
      title: '被教授狠狠的打了耳光',
      category: 'script',
      description: '教授想辦法脅迫學生的故事。',
      color: 'from-lime-500 to-green-600',
      height: 'h-35',
      link: 'https://docs.google.com/document/d/1tenP25mQNddAZnmnbtVY0iaKsMVAT3On/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
      release: 'https://youtu.be/Iz8NgZh6skM?si=_trefBTgedkBpJ31'
    },
    {
      id: 4,
      title: '無法逃離獸人姊姊病嬌的愛',
      category: 'script',
      description: '關於一位人類被獸人愛上，被獸人吃死死的故事。',
      color: 'from-pink-500 to-orange-600',
      height: 'h-35',
      link: 'https://docs.google.com/document/d/1zTnok8jxem9SyvGPEnubojxhy93pE0VT/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true'
    },
    {
      id: 5,
      title: '等待女朋友回家的時候被姊姊給襲擊了',
      category: 'script',
      description: '關於姊姊想把自己妹妹的男朋友占為己有的故事。',
      color: 'from-purple-500 to-pink-600',
      height: 'h-30',
      link: 'https://docs.google.com/document/d/1V2sXyTSFe8GnAR5plV4WDygGwcXH7n68/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true'
    },
    {
      id: 6,
      title: '絲襪日的小確幸',
      category: 'script',
      description: '被無理取鬧的女上司為難的故事',
      color: 'from-yellow-500 to-red-600',
      height: 'h-30',
      link: 'https://docs.google.com/document/d/1S_9V9NFi2l9spMULDFDw-Siv0AZrS_hF/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true'
    },
    {
      id: 7,
      title: '我是你的行星環，你永遠當我的太陽，好嗎？（夏季篇）',
      category: ['script', 'creation'],
      description: '與可愛的女朋友在校園的草地上親親我我的故事',
      color: 'from-cyan-500 to-purple-600',
      height: 'h-96',
      link: 'https://docs.google.com/document/d/1lHbkDro0s-PINt4qaMT_gEeisT3S2cl5/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
      release: 'https://youtu.be/P5U56uoFyec?si=M9kX9UaD8I9EZTbO',
  // public/ files are copied to the site root at build time — reference via BASE_URL + 'work_pic/...'
  image: import.meta.env.BASE_URL + 'work_pic/work_id7.jpg'

    },
    {
      id: 8,
      title: '頤指氣使的學妹',
      category: ['script', 'creation'],
      description: '學長帶了系花託他準備的原文書，系花意思意思地打算請學長喝飲料，但學長一連串直男回答與要求使她煩躁不堪。',
      color: 'from-indigo-500 to-purple-600',
      height: 'h-75',
      link: 'https://docs.google.com/document/d/11egSpT8jzC1Xs7Z4wDW4a6o6i48cZQWQ/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
      release: 'https://youtu.be/KVuv_6Em-Xk?si=4RtZsEUTmM3lNabt',
  image: import.meta.env.BASE_URL + '/work_pic/work_school.jpeg'
    },
    {
      id: 9,
      title: '捷運忠孝新生站',
      category: ['creation'],
      description: '和同為熱音社且正在曖昧的女生在畢業前一起去唱歌，離別時湧起曲終人散的寂寞。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-88',
      // link: 'https://docs.google.com/document/d/1Dy3-vkLOS2it3aL51u1aZNkqrkKpn26m/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
  image: import.meta.env.BASE_URL + '/work_pic/work_MRT.jpeg'
    },
    {
      id: 10,
      title: '鄉間小路與多愁善感的姊姊',
      category: ['script', 'creation'],
      description: '女孩等著自己兩年不見的弟弟回家，人跟景物時在變化太大，女孩不禁放聲哭泣了起來。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-88',
      link: 'https://docs.google.com/document/d/1AYjLeykOJdILUX3rxRYNqRg2kM8YJZR7/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
      release: 'https://youtu.be/8pzdFcY7cEU?si=zL1LNF2ndj7CvkXd',
  image: import.meta.env.BASE_URL + '/work_pic/work_sis.png'
    },
    {
      id: 11,
      title: '紙條',
      category: ['creation'],
      description: '好朋友突然不來學校了，於是我每天都寫張紙條告訴他學校的事情。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-42',
      // link: 'https://docs.google.com/document/d/1F9o-b8AC2VD-oRfbCiuP9uFhPkGdSM8_/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
  image: import.meta.env.BASE_URL + '/work_pic/work_note.jpeg'
    },
    {
      id: 12,
      title: '飛機雲',
      category: ['creation'],
      description: '曾在學校一起立下的目標，說好一起陪伴彼此，最終都在夢想面前一一妥協。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-63',
      // link: 'https://docs.google.com/document/d/1JuPygjFXsBVfrDhX_Nlc-hSQPgamnXtv/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
  image: import.meta.env.BASE_URL + '/work_pic/work_cloud.jpeg'
    },
    {
      id: 13,
      title: '雨季與畢業季',
      category: ['script', 'creation'],
      description: '實習生上班的最後一天待在陽台若有所思，學姊走過來與他談談心。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-63',
      link: 'https://docs.google.com/document/d/1XpX_o2pX4xCszo77egUeLnKXoZE7XNhm/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
  image: import.meta.env.BASE_URL + '/work_pic/work_rain.jpeg'
    },
    {
      id: 14,
      title: '依附性戀愛症候群',
      category: ['creation'],
      description: '一位弟弟常常來看皮膚科，漸漸參與且明白了醫師姊姊的生活。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-55',
      // link: 'https://docs.google.com/document/d/150ZECE5dGyYaarT2iFvrsLgVTwzRuQ6-/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
  image: import.meta.env.BASE_URL + '/work_pic/work_doctor.jpeg'
    },
    {
      id: 15,
      title: '你闖進了我的早自習',
      category: ['creation'],
      description: '早晨，全校升旗時間有兩個人窩在教室。原本不太交集的同班同學，因為早自習的混亂事件，兩人距離似乎拉近了一些。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-55',
      // link: 'https://docs.google.com/document/d/1HHprrIL6q9BkEemRtEujNI4cL0gWiRNf/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
  image: import.meta.env.BASE_URL + '/work_pic/work_morning.jpeg'
    },
    {
      id: 16,
      title: '在早餐店睡著了',
      category: ['creation'],
      description: '一名上班族在早餐店遇到一位吃早餐吃到睡著的小孩，開啟了兩人人生觀與價值觀差異心靈交流。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-40',
      // link: 'https://docs.google.com/document/d/1IOwumirHhDvN3TXqkPMQL2m93Catb6Hg/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
  image: import.meta.env.BASE_URL + '/work_pic/work_burger.png'
    },
    {
      id: 17,
      title: '令人難以入眠的半夜通話',
      category: ['script', 'creation'],
      description: '深夜，女孩輾轉反側，打電話給了自己非常要好的朋友聊天。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-30',
      link: 'https://docs.google.com/document/d/1IOwumirHhDvN3TXqkPMQL2m93Catb6Hg/edit?usp=sharing&ouid=115379523661572300748&rtpof=true&sd=true',
    },
    {
      id: 18,
      title: '我才是最特別的納一位',
      category: 'commission',
      description: '夾在老婆納與人妻納暗潮洶湧的關係中左右擺盪。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-80',
      release: 'https://youtu.be/ZIVgpsQ8B-U?si=US9_4S-4OuVjWfBd',
  image: import.meta.env.BASE_URL + '/work_pic/work_narciss.jpg'
    },
    {
      id: 19,
      title: '居酒屋的姊姊似乎討厭下雨天',
      category: 'creation',
      description: '心很累的姊姊與小男孩聊天後漸漸恢復元氣的故事。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-80',
      release: 'https://youtu.be/H5BQIZOmnuE?si=ziBn8emn_3bwvyhy',
  image: import.meta.env.BASE_URL + 'work_pic/work_karas.jpg'
    },
    {
      id: 20,
      title: '鼠在不想離開你',
      category: 'commission',
      description: '情人節吃醋的學生咲鼠，翹課來保健室找老師尋求陪伴時發生的一連串意外。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-80',
      release: 'https://youtu.be/QUgRyT-gGnk?si=pp4meRlyUKl3ShCv',
  image: import.meta.env.BASE_URL + '/work_pic/work_mouse.jpg'
    },
    {
      id: 21,
      title: 'Love Sick',
      category: 'creation',
      description: '我拿下雨完全沒辦法，你也是。就像我拿我的病沒辦法，而你也一樣。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-70',
      release: 'https://youtu.be/0J5-uTq_Iv8?si=G_DYwHunXyXs4lWM',
  image: import.meta.env.BASE_URL + '/work_pic/love_sick.png'
    },
    {
      id: 22,
      title: '我們的事',
      category: 'creation',
      description: '未來的五年、十年，我都希望你可以過得很好。我們要延續屬於我們的故事。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-80',
      release: 'https://youtu.be/7skNvaxGDZ0?si=YB0CxLZYgZAwmikM',
  image: import.meta.env.BASE_URL + '/work_pic/work_between_us.jpg'
    },
    {
      id: 23,
      title: '巧克力的形狀是IEEE',
      category: 'creation',
      description: '家人跟教授都很支持我，所以我必須成為發光的存在。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-75',
      release: 'https://youtu.be/m-4WFyJfKJU?si=buAfd2Ub4_Q-4-j_',
  image: import.meta.env.BASE_URL + '/work_pic/work_chocolate.jpg'
    },
    {
      id: 24,
      title: '慾兔',
      category: 'creation',
      description: '身為Pekora粉絲的你養了一隻兔子，雖然天天開玩笑地說希望它變成Pekora，但想也知道是不可能的。可是就在中秋這天，突然有個自稱玉兔姊姊的神秘女子闖入你的房間還說要把你撲倒⋯⋯',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-75',
      release: 'https://youtu.be/rUMoPagxK1Q?si=cB-T5g-d6xa5uQIW',
  image: import.meta.env.BASE_URL + '/work_pic/work_rabbit.jpg'
    },
    {
      id: 25,
      title: '只想要你聽著我',
      category: 'creation',
      description: '兩位音樂系的學生畢業後各奔東西，再次相逢已是兩年後。學生時代兩人感情無法修成正果，兩年後的今天卻擦出了不一樣的火花。',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-80',
      release: 'https://www.youtube.com/watch?v=05M8vv48VFU&t=1s',
  image: import.meta.env.BASE_URL + '/work_pic/work_want.jpg'
    },
    
  ];

  // 分類對應：直接以三種分類對照
  const categoryMap: Record<Exclude<Category, 'all'>, string[]> = {
    creation: ['creation'],
    script: ['script'],
    commission: ['commission'],
  };

  // helper：把 category 正規化為陣列
  const normalizeCats = (cat: string | string[]) =>
    Array.isArray(cat) ? cat : [cat];

  // 將原始 category 字串轉換成顯示用的中文標籤（支援陣列）
  const getCategoryLabel = (cat: string | string[]) => {
    const cats = normalizeCats(cat);
    const labels = cats.map((c) => {
      if (c === 'creation') return '創作';
      if (c === 'script') return '公開台本';
      if (c === 'commission') return '委託';
      return c;
    });
    // 去重並用頓號分隔（例如「創作、公開台本」）
    return Array.from(new Set(labels)).join('、');
  };

  const filteredWorks =
    selectedCategory === 'all'
      ? works
      : works.filter((work) => {
          const cats = normalizeCats(work.category);
          const allowed = categoryMap[selectedCategory as Exclude<Category, 'all'>];
          // 若 work 任何一個原始 category 在 allowed 清單中就保留
          return cats.some((c) => allowed.includes(c));
        });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-center mb-4"
        >
          <span className="text-neon-cyan">各式作品</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/80 mb-12 text-lg"
        >
          使用「公開台本」時請遵守
          {' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/15HFjEE0m5qFX0OtDq1C59SPF5aU3tZHCzPS4GSfDPvQ/edit?usp=sharing"
            className="text-neon-lime underline underline-offset-4 font-bold hover:text-lime-300"
          >
            使用規範
          </a>
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category.id as Category)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-neon-pink text-black border-2 border-neon-pink'
                  : 'border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredWorks.slice(0, page * PAGE_SIZE).map((work, index) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setSelectedWork(work)}
                className={`break-inside-avoid mb-6 ${work.height} rounded-2xl p-0 cursor-pointer border-2 border-white/20 hover:border-white/60 transition-all overflow-hidden relative group`}
              >
                {/* 若有圖片就用圖片覆蓋背景，否則使用漸層色 */}
                {work.image ? (
                  <>
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      onError={(e) => {
                        // 若載入失敗，改為顯示漸層（或替換成本地 fallback）
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        // 可選：把 parent 用漸層背景顯示
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all" />
                  </>
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${work.color}`} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all" />
                  </>
                )}
 
                {/* 若有 release，左上顯示喇叭圖示，點擊會在新分頁開啟並阻止卡片 click */}
                {work.release && (
                  <div className="absolute top-4 right-4 opacity-100">
                    <a
                      href={work.release}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="聆聽作品"
                      title="聆聽作品"
                      className="p-1 rounded-md hover:bg-white/10 transition-colors"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                  </div>
                )}

                <div className="relative h-full flex flex-col justify-end p-4 sm:p-6">
                  <h3 className="text-2xl font-black text-white mb-2">
                    {work.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">
                    {work.description}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
                    {getCategoryLabel(work.category)}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {work.link ? (
                    <a href={work.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink className="w-6 h-6 text-white" />
                    </a>
                  ) : (
                    <ExternalLink className="w-6 h-6 text-white/40" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage((p) => p + 1)}
            disabled={page * PAGE_SIZE >= filteredWorks.length}
            className={`px-10 py-4 rounded-full border-2 border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-black transition-all duration-300 font-bold text-lg ${
              page * PAGE_SIZE >= filteredWorks.length ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {page * PAGE_SIZE >= filteredWorks.length ? '已顯示全部' : '載入更多作品'}
          </motion.button>
        </motion.div>
      </div>

      {/* 使用規範：連結目標區塊（可自行補充內容） */}
      <motion.div
        id="usage-rules"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8"
      >
        <h2 className="text-2xl font-black text-neon-lime mb-3">使用規範</h2>
        <p className="text-white/80 text-sm">
          1. 歡迎使用公開台本進行練習。<br />
          2. 公開發表請取得卡蚯蚓同意。<br />
          3. 詳細說明請見
          {' '}
          <a
            href="https://docs.google.com/document/d/15HFjEE0m5qFX0OtDq1C59SPF5aU3tZHCzPS4GSfDPvQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-lime underline underline-offset-4 font-bold hover:text-lime-300"
          >
            「使用規範文件」
          </a>
        </p>
      </motion.div>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full glass-card rounded-2xl p-8 border-2 border-neon-pink relative"
            >
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 p-2 rounded-full border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* 圖片或漸層（在 modal 中顯示） */}
              {selectedWork.image ? (
                <div className="w-full h-64 rounded-xl mb-6 overflow-hidden">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-full h-64 rounded-xl bg-gradient-to-br ${selectedWork.color} mb-6`} />
              )}

               <h2 className="text-3xl font-black text-neon-pink mb-4">
                 {selectedWork.title}
               </h2>
 
               <p className="text-white/90 mb-6 leading-relaxed">
                 {selectedWork.description}
               </p>
 
               <div className="flex gap-4">
                <span className="px-4 py-2 rounded-full bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan text-sm font-bold uppercase">
                  {getCategoryLabel(selectedWork.category)}
                 </span>
                {selectedWork.link && (
                  <a
                    href={selectedWork.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border-2 border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    文本連結
                  </a>
                )}
                {selectedWork.release && (
                  <a
                    href={selectedWork.release}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border-2 border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    聆聽作品
                  </a>
                )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Works;
