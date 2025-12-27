import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

type Category = 'all' | 'illustration' | 'animation' | 'character' | 'commission';

interface Work {
  id: number;
  title: string;
  category: Category;
  description: string;
  color: string;
  height: string;
}

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'illustration', label: 'Illustrations' },
    { id: 'animation', label: 'Animations' },
    { id: 'character', label: 'Characters' },
    { id: 'commission', label: 'Commissions' },
  ];

  const works: Work[] = [
    {
      id: 1,
      title: 'Cyber Cat #001',
      category: 'character',
      description: 'A futuristic cat character with neon accessories and holographic elements.',
      color: 'from-pink-500 to-purple-600',
      height: 'h-80',
    },
    {
      id: 2,
      title: 'Neon Dreams',
      category: 'illustration',
      description: 'An atmospheric piece exploring the intersection of nature and technology.',
      color: 'from-cyan-500 to-blue-600',
      height: 'h-96',
    },
    {
      id: 3,
      title: 'Pop Art Character',
      category: 'character',
      description: 'Vibrant character design combining pop art aesthetics with cyber elements.',
      color: 'from-lime-500 to-green-600',
      height: 'h-72',
    },
    {
      id: 4,
      title: 'Commission Work',
      category: 'commission',
      description: 'Custom VTuber model design with unique cyber-pop styling.',
      color: 'from-pink-500 to-orange-600',
      height: 'h-88',
    },
    {
      id: 5,
      title: 'City Lights',
      category: 'illustration',
      description: 'Urban landscape bathed in neon glow with a lonely cat protagonist.',
      color: 'from-purple-500 to-pink-600',
      height: 'h-80',
    },
    {
      id: 6,
      title: 'Dance Animation',
      category: 'animation',
      description: 'Smooth character animation featuring dynamic dance movements.',
      color: 'from-yellow-500 to-red-600',
      height: 'h-72',
    },
    {
      id: 7,
      title: 'Holographic Avatar',
      category: 'character',
      description: 'Translucent character design with holographic shader effects.',
      color: 'from-cyan-500 to-purple-600',
      height: 'h-96',
    },
    {
      id: 8,
      title: 'Starry Night',
      category: 'illustration',
      description: 'Cosmic illustration featuring a cat gazing at digital constellations.',
      color: 'from-indigo-500 to-purple-600',
      height: 'h-80',
    },
    {
      id: 9,
      title: 'VTuber Model',
      category: 'commission',
      description: 'Full Live2D rigged model for streaming with custom expressions.',
      color: 'from-pink-500 to-cyan-600',
      height: 'h-88',
    },
  ];

  const filteredWorks = selectedCategory === 'all'
    ? works
    : works.filter((work) => work.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-center mb-4"
        >
          <span className="text-neon-pink">My </span>
          <span className="text-neon-cyan">Creative </span>
          <span className="text-neon-lime">Works</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/80 mb-12 text-lg"
        >
          Explore my portfolio of cyber-pop creations
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
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setSelectedWork(work)}
                className={`break-inside-avoid mb-6 ${work.height} rounded-2xl bg-gradient-to-br ${work.color} p-6 cursor-pointer border-2 border-white/20 hover:border-white/60 transition-all overflow-hidden relative group`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all" />

                <div className="relative h-full flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-white mb-2">
                    {work.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">
                    {work.description}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                    {work.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-6 h-6 text-white" />
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
            className="px-10 py-4 rounded-full border-2 border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-black transition-all duration-300 font-bold text-lg"
          >
            Load More Works
          </motion.button>
        </motion.div>
      </div>

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

              <div className={`w-full h-64 rounded-xl bg-gradient-to-br ${selectedWork.color} mb-6`} />

              <h2 className="text-3xl font-black text-neon-pink mb-4">
                {selectedWork.title}
              </h2>

              <p className="text-white/90 mb-6 leading-relaxed">
                {selectedWork.description}
              </p>

              <div className="flex gap-4">
                <span className="px-4 py-2 rounded-full bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan text-sm font-bold uppercase">
                  {selectedWork.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Works;
