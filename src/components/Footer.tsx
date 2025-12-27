import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 py-8 border-t border-neon-pink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={scrollToTop}
            className="group relative p-3 rounded-full border-2 border-neon-cyan hover:border-neon-pink transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6 text-neon-cyan group-hover:text-neon-pink transition-colors duration-300" />
          </button>

          <div className="text-center">
            <p className="text-neon-pink font-bold text-sm tracking-widest animate-pulse">
              2025 CYBER-POP
            </p>
            <p className="text-white/60 text-xs mt-1">
              Powered by Neon Dreams
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
