import { motion } from 'framer-motion';
import { Code, Palette, Music, Star, Zap, Heart } from 'lucide-react';

const Profile = () => {
  const skills = [
    { name: 'Illustration', icon: Palette, level: 95 },
    { name: 'Animation', icon: Zap, level: 88 },
    { name: 'Design', icon: Star, level: 92 },
    { name: 'Coding', icon: Code, level: 85 },
  ];

  const timeline = [
    { year: '2020', event: 'Started as VTuber', color: 'neon-pink' },
    { year: '2021', event: 'First Character Design', color: 'neon-cyan' },
    { year: '2023', event: '10K Followers Milestone', color: 'neon-lime' },
    { year: '2024', event: 'Launched Personal Brand', color: 'neon-pink' },
  ];

  const gallery = [
    { id: 1, title: 'Character Design', color: 'bg-gradient-to-br from-pink-500 to-purple-600' },
    { id: 2, title: 'Cyber Cat Series', color: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { id: 3, title: 'Neon Dreams', color: 'bg-gradient-to-br from-lime-500 to-green-600' },
    { id: 4, title: 'Digital Art', color: 'bg-gradient-to-br from-pink-500 to-orange-600' },
    { id: 5, title: 'Live2D Models', color: 'bg-gradient-to-br from-purple-500 to-indigo-600' },
  ];

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
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 animate-gradient" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Music className="w-32 h-32 text-white/90" />
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-black mb-4"
            >
              <span className="text-neon-pink">Cyber</span>
              <span className="text-neon-cyan">Pop</span>
              <span className="text-neon-lime"> Artist</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/80 mb-6 font-bold"
            >
              VTuber / Illustrator / Creator
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              {['Creative', 'Energetic', 'Innovative'].map((tag, index) => (
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
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-2 border-neon-lime"
          >
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              Welcome to my cyber-pop universe! I'm a digital artist and content creator passionate about blending futuristic neon aesthetics with cute, approachable designs. My work focuses on creating vibrant characters that bridge the gap between cyberpunk edginess and pop culture charm.
            </p>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              As a VTuber, I stream art creation, gaming, and chatting sessions where I connect with an amazing community of fellow creators and enthusiasts. Every piece I create is infused with energy, color, and a touch of digital magic.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              When I'm not creating art, you'll find me exploring new design trends, experimenting with animation techniques, or collaborating with other artists to push the boundaries of what's possible in the digital realm. Let's create something extraordinary together!
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
            Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl border-2 border-neon-cyan"
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
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-lime rounded-full"
                  />
                </div>
                <span className="text-neon-cyan text-sm font-bold mt-2 block">
                  {skill.level}%
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
            Timeline
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
                  <p className="text-lg font-bold text-white">
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
            Gallery Highlights
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`aspect-square rounded-2xl ${item.color} p-6 flex items-center justify-center border-2 border-white/20 hover:border-white/60 transition-all cursor-pointer`}
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
