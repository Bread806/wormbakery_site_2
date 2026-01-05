import { motion } from 'framer-motion';
import { Code, Palette, Music, Star, Zap, Heart } from 'lucide-react';

const Profile = () => {
  const skills = [
    { name: '短篇文本', icon: Palette, exp: 80 },
    { name: '音聲作品', icon: Zap, exp: 88 },
    { name: '會員語音', icon: Star, exp: 92 },
    { name: '企劃文本', icon: Code, exp: 85 },
  ];

  const timeline = [
    { year: '2022', event: '我與充滿包容力的姊姊撒嬌日常 \n 等待女朋友回家的時候被姊姊給襲擊了 \n 無法逃離獸人姊姊病嬌的愛', color: 'neon-pink' },
    { year: '2023', event: '鄉間小路與多愁善感的姐姐 \n 慾兔 \n 我們的事', color: 'neon-cyan' },
    { year: '2024', event: '只想要你聽著我 \n 我才是最特別的納一位 \n 居酒屋的姊姊似乎討厭下雨天', color: 'neon-lime' },
    { year: '2025', event: '鼠在不想離開你 \n Love Sick', color: 'neon-pink' },
    { year: '2026', event: ' \" 敬請期待 :D \"', color: 'neon-blue' }
  ];

  const gallery = [
    { id: 1, title: 'Character Design', color: 'bg-gradient-to-br from-pink-500 to-purple-600' },
    { id: 2, title: 'Cyber Cat Series', color: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { id: 3, title: 'Neon Dreams', color: 'bg-gradient-to-br from-lime-500 to-green-600' }
  ];

  // 可編輯備註（儲存到 localStorage）
  const EditableNotes = () => {
    const key = 'profile_notes';
    const [text, setText] = React.useState(() => {
      try { return localStorage.getItem(key) ?? ''; } catch { return ''; }
    });
    React.useEffect(() => {
      try { localStorage.setItem(key, text); } catch {}
    }, [text]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl border-2 mt-8"
      >
        <label className="block text-sm text-white/70 font-bold mb-2">個人備註</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`例如：\n短篇文本\n10-30分鐘的台本類型`}
          className="w-full min-h-[96px] bg-transparent border border-white/10 p-3 rounded-md text-white/90 placeholder-white/40 resize-vertical"
        />
        <div className="mt-2 text-xs text-white/60">內容會儲存在瀏覽器，僅供本機使用。</div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center gap-12 mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative w-64 h-64 rounded-3xl overflow-hidden border-4 border-neon-pink shadow-neon-pink"
          >
            <img
              src={import.meta.env.BASE_URL + "/pic/profile_1.png"}
              alt="profile art"
              className="absolute inset-0 w-full h-full object-cover"
              // 將裁切焦點往下移（50% = 水平 中心, 60% = 垂直偏下）
              style={{ objectPosition: '50% 10%' }}
            />
            {/* 可選遮罩：讓下方裁切看起來更柔和 */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-black mb-4"
            >
              {/* <span className="text-neon-pink">Cyber</span>
              <span className="text-neon-cyan">Pop</span>
              <span className="text-neon-lime"> Artist</span> */}
              <span className="text-neon-cyan">卡蚯蚓</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/80 mb-6 font-bold"
            >
              Writing / VTuber Staff
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              {['台本設計', 'VTuber窗口'].map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full border-2 border-neon-cyan text-neon-cyan text-sm font-bold"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-neon-lime mb-8"
          >
            關於我
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-2 border-neon-lime"
          >
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              我叫做卡蚯蚓，可以稱呼我蚯蚓就好。喜歡寫作與編劇，同時也是喜歡各種聲音表演的聽眾。在網路上發表與撰寫短篇語音、長篇音聲作品與情境劇台本。在這個網站裡，你可以看到我曾參與過的作品以及我練習的文本。
            </p>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              蚯蚓麵包屋是一個我用來發表實驗性質作品的計畫，多數作品會免費發表讓表演者練習。作品發表的頻率不固定，不過都會是我覺得富有意義的創作。
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              聯絡台本委託可以見 Official SNS 頁面。委託會先經過一輪需求討論才會確認是否承接，造成不便請見諒。
            </p>
          </motion.div>
        </section>

        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-neon-cyan mb-8"
          >
            承接委託事項
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 rounded-2xl border-2 border-neon-cyan"
              >
                <div className="flex items-center gap-4 mb-4">
                  <skill.icon className="w-8 h-8 text-neon-cyan" />
                  <span className="text-xl font-black text-white">
                    {skill.name}
                  </span>
                </div>
                <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.exp}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-lime rounded-full"
                  />
                </div>
                {/* 不顯示任何數字 */}
                <span className="text-neon-cyan text-sm font-bold mt-2 block invisible">
                  exp: {skill.exp} %
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-neon-pink mb-8"
          >
            部分參與作品
          </motion.h2>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex items-center gap-6"
              >
                <div className={`w-24 h-24 rounded-full border-4 border-${item.color} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-2xl font-black text-${item.color}`}>
                    {item.year}
                  </span>
                </div>
                <div className={`glass-card p-6 rounded-2xl border-2 border-${item.color} flex-1`}>
                  <p className="text-lg font-bold text-white whitespace-pre-line">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-neon-lime mb-8"
          >
            其他關於我ㄉ酷酷圖片
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`aspect-square rounded-2xl overflow-hidden ${item.color} border-2 border-white/20 hover:border-white/60 transition-all cursor-pointer`}
              >
                {/* 把圖片放 public/pic/gallery-1.png, gallery-2.png ... */}
                <img
                  src={import.meta.env.BASE_URL + `pic/gallery-${item.id}.png`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  // 只調整第一張（index === 0）的裁切點，其他維持中央裁切
                  style={index === 0 ? { objectPosition: '50% 5%' } : { objectPosition: '50% 50%' }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
