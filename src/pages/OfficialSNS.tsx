import { motion } from 'framer-motion';
import { Twitter, Youtube, Instagram, Twitch, Music, Mail } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';

// 內嵌 Discord icon（使用 currentColor）
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M60.1 4.5A58.6 58.6 0 0047.6.5a41.6 41.6 0 00-2.1 4.4c-6-1-12-1-18 .1-2.6.5-5 1.2-7.2 2.1A42 42 0 0010 4.6C3.7 15.2 5 25.6 5.7 33.5a59.4 59.4 0 0017 10.6c1.3-.9 2.5-1.9 3.5-3.1-2.9-1.1-5.7-2.4-8.3-3.9 1.4-.9 2.8-1.8 4.1-2.8a40.8 40.8 0 0031.1 0c1.3 1 2.7 1.9 4.1 2.8-2.6 1.5-5.4 2.8-8.3 3.9 1 1.2 2.2 2.2 3.5 3.1a59.4 59.4 0 0017-10.6c.8-8 2-18.3-6.1-28.6zM24.6 37.6c-3.1 0-5.6-2.8-5.6-6.2 0-3.4 2.5-6.2 5.6-6.2 3.2 0 5.7 2.8 5.6 6.2.1 3.4-2.4 6.2-5.6 6.2zm21.8 0c-3.1 0-5.6-2.8-5.6-6.2 0-3.4 2.5-6.2 5.6-6.2 3.2 0 5.7 2.8 5.6 6.2.1 3.4-2.4 6.2-5.6 6.2z" fill="currentColor"/>
  </svg>
);

const OfficialSNS = () => {
  // 使用明確的 Tailwind 類別，避免動態字串被 purge
  const socialLinks = [
    {
      name: 'Twitter(X)',
      icon: Twitter,
      handle: '@bread_sk8',
      description: '關於我ㄉ雜七雜八',
      url: 'https://x.com/bread_sk8',
      containerClass: 'border-neon-cyan hover:shadow-neon-cyan',
      textClass: 'text-neon-cyan',
      iconClass: 'text-neon-cyan',
    },
    {
      name: 'Discord',
      icon: SiDiscord,
      handle: '@bread_sk8',
      description: '緊急的事情可以用dc聯絡，非緊急建議使用信箱詢問。',
      url: '',
      containerClass: 'border-purple-500 hover:shadow-lg',
      textClass: 'text-purple-400',
      iconClass: 'text-purple-400',
    },
    {
      name: 'Email',
      icon: Mail,
      handle: 'wormbakery@gmail.com',
      description: '工作聯絡事宜請透過信箱聯繫！',
      url: '',
      containerClass: 'border-neon-lime hover:shadow-neon-lime',
      textClass: 'text-neon-lime',
      iconClass: 'text-neon-lime',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-center mb-4">
            
            <span className="text-neon-cyan">社群連結</span>
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            合作、委託，或是台本使用相關授權相關事宜，歡迎使用以下社群連結與我聯絡🥳。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`glass-card p-8 rounded-2xl border-2 ${social.containerClass} transition-all duration-300 group`}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <social.icon className={`w-16 h-16 ${social.iconClass} group-hover:scale-110 transition-transform`} />
              </motion.div>

              <h2 className={`text-2xl font-black ${social.textClass} mb-2`}>
                {social.name}
              </h2>

              <p className="text-white/60 text-sm mb-3 font-mono">
                {social.handle}
              </p>

              <p className="text-white/80 leading-relaxed">
                {social.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white/60 group-hover:text-white transition-colors">
                <span>Visit Profile</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-2xl border-2 border-neon-pink text-center"
        >
          <h2 className="text-3xl font-black text-neon-pink mb-4">
            Stay Connected!
          </h2>

          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Don't miss out on exclusive content, early access to new works, and community events. Follow me on your favorite platform and become part of the cyber-pop family!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-neon-cyan bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 font-bold"
            >
              Join Discord Community
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-neon-lime bg-neon-lime/20 text-neon-lime hover:bg-neon-lime hover:text-black transition-all duration-300 font-bold"
            >
              Subscribe to Newsletter
            </motion.button>
          </div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-sm">
            期待收到您的聯繫🙏🏻
          </p>
          <img
            src={import.meta.env.BASE_URL + 'pic/text_white.png'}
            alt="Contact Image"
            className="mx-auto mt-6 w-full max-w-xs rounded-md"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default OfficialSNS;
