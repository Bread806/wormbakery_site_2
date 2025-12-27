import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, ArrowRight } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';

const Home = () => {
  const [showLoading, setShowLoading] = useState(true);

  const updates = [
    {
      icon: Sparkles,
      title: 'New Artwork',
      description: 'Check out my latest illustration featuring cyber cats!',
      color: 'neon-pink',
    },
    {
      icon: Zap,
      title: 'Video Upload',
      description: 'New animation series now live on my channel.',
      color: 'neon-cyan',
    },
    {
      icon: Heart,
      title: 'Community Event',
      description: 'Join me for a live drawing session this weekend!',
      color: 'neon-lime',
    },
  ];

  return (
    <>
      {showLoading && (
        <LoadingScreen onLoadingComplete={() => setShowLoading(false)} />
      )}

      <div className="min-h-screen">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-blue-900/50" />

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 neon-glow-pink animate-float" />
            <div className="absolute bottom-40 right-32 w-24 h-24 neon-glow-cyan animate-float-delayed" />
            <div className="absolute top-1/2 left-1/3 w-20 h-20 neon-glow-lime animate-float" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="relative z-10 text-center px-4"
          >
            <motion.h1
              className="text-6xl sm:text-8xl font-black mb-6 tracking-tight"
              animate={{
                textShadow: [
                  '0 0 20px #FF007F, 0 0 40px #FF007F',
                  '0 0 20px #00F3FF, 0 0 40px #00F3FF',
                  '0 0 20px #CCFF00, 0 0 40px #CCFF00',
                  '0 0 20px #FF007F, 0 0 40px #FF007F',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-neon-pink">Welcome to</span>
              <br />
              <span className="text-neon-cyan">Cyber-Pop</span>
              <br />
              <span className="text-neon-lime">World</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="text-xl sm:text-2xl text-white/80 mb-12 font-bold"
            >
              Where Neon Dreams Meet Cute Creativity
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all duration-300 font-bold text-lg flex items-center gap-2 mx-auto group"
            >
              Explore Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-black text-center mb-16 text-neon-pink"
            >
              Latest Updates
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {updates.map((update, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`glass-card p-8 rounded-2xl border-2 border-${update.color} hover:shadow-neon-${update.color} transition-all duration-300`}
                >
                  <update.icon className={`w-12 h-12 text-${update.color} mb-4`} />
                  <h3 className={`text-2xl font-black text-${update.color} mb-3`}>
                    {update.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {update.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-black text-neon-lime mb-6">
              Ready to Connect?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Let's create something amazing together!
            </p>
            <motion.a
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 rounded-full border-2 border-neon-pink bg-neon-pink/20 text-neon-pink hover:bg-neon-pink hover:text-black transition-all duration-300 font-bold text-lg"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;
