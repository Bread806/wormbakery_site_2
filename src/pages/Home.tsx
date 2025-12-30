import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-0">
      {/* 將 section 設為視窗高度減去上方/下方預留空間，並確保內容垂直置中且不超出視窗 */}
      <section
        className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-8 box-border"
        aria-label="home-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-blue-900/50" />

        {/* raster fog: appears in front of gradient but behind content */}
        <div className="fogwrapper fog-light" style={{ zIndex: 8 }} aria-hidden>
          <div id="foglayer_01" className="fog">
            <div className="image01" />
            <div className="image02" />
          </div>
          <div id="foglayer_02" className="fog">
            <div className="image01" />
            <div className="image02" />
          </div>
          <div id="foglayer_03" className="fog">
            <div className="image01" />
            <div className="image02" />
          </div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 neon-glow-pink animate-float" />
          <div className="absolute bottom-40 right-32 w-24 h-24 neon-glow-cyan animate-float-delayed" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 neon-glow-lime animate-float" />
        </div>

        <motion.div className="relative z-10 text-center px-4 flex flex-col items-center justify-center gap-4">
          {/* 先顯示背景與 fog，稍微延遲再一起顯示 hero 的圖片與文字，以避免文字/圖片不同步的感覺 */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.h1
              className="text-5xl sm:text-7xl font-black tracking-tight leading-none"
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
              {/* 限制圖片最大高度以避免被裁切，並水平置中 */}
              <img
                src={import.meta.env.BASE_URL + 'pic/gallery-3.png'}
                alt="Text White"
                loading="eager"
                decoding="async"
                className="mx-auto w-auto h-auto max-h-[18vh] sm:max-h-[28vh] md:max-h-[34vh] lg:max-h-[40vh] mb-0"
                style={{ display: 'block' }}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-2xl md:text-3xl text-white/95 font-light max-w-4xl md:max-w-5xl mx-auto text-center"
            >
              <span className="block courier-prime font-light">To find the perfect words.</span>
              <span className="block mt-2 courier-prime font-light">To say less but to say more.</span>
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
