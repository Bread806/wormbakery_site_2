import { motion } from 'framer-motion';
import { Cat } from 'lucide-react';

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
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block mb-8"
        >
          <Cat className="w-20 h-20 text-neon-pink" />
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
