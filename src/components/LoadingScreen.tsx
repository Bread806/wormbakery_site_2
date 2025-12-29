import React, { useEffect, useState } from 'react';
import Typewriter from './Typewriter';

type Props = {
  onLoadingComplete?: () => void;
  minDurationMs?: number;
};

const LoadingScreen: React.FC<Props> = ({ onLoadingComplete, minDurationMs = 2000 }) => {
  const [progress, setProgress] = useState(0);
  const [startTs] = useState(() => Date.now());

  useEffect(() => {
    let mounted = true;
    const id = setInterval(() => {
      setProgress((p) => {
        if (!mounted) return p;
        const delta = p < 60 ? Math.random() * 6 + 3 : p < 95 ? Math.random() * 3 + 1 : Math.random() * 1;
        const next = Math.min(100, Math.round((p + delta) * 10) / 10);
        return next;
      });
    }, 80);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const elapsed = Date.now() - startTs;
      const wait = Math.max(0, minDurationMs - elapsed);
      const t = setTimeout(() => onLoadingComplete && onLoadingComplete(), wait);
      return () => clearTimeout(t);
    }
  }, [progress, onLoadingComplete, minDurationMs, startTs]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="status" aria-live="polite">
      <div className="w-[360px] p-6 border-2 border-white text-white rounded-none bg-transparent">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold tracking-wider">Loading</div>
          <div className="text-sm font-mono">{Math.min(100, Math.round(progress))}%</div>
        </div>

        <div className="w-full h-4 border-2 border-white rounded-none overflow-hidden bg-white/5">
          <div className="h-full bg-white transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-4 text-xs text-white/60">
          <Typewriter text="please wait..." speed={50} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
