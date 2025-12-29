import { motion } from 'framer-motion';
import React from 'react';

const SHIBA_SRC = '/pic/bread-svgrepo-com_2.svg'; // 或 '/pic/bread-svgrepo-com_2.svg'

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onLoadingComplete}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black"
    >
      <div className="text-center">
        <motion.div
          animate={{
            // 微幅縮放：從 1 -> 1.08 -> 1
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block mb-8"
        >
          <img src={SHIBA_SRC} alt="loading shiba" className="w-28 h-28 object-contain" />
        </motion.div>

        <motion.div
          className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-lime"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          className="mt-6 text-neon-cyan font-black text-xl tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
