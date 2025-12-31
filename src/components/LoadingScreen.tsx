import React, { useEffect, useState } from 'react';
import Typewriter from './Typewriter';

type Props = {
  onLoadingComplete?: () => void;
  minDurationMs?: number;
};

const LoadingScreen: React.FC<Props> = ({ onLoadingComplete, minDurationMs = 2000 }) => {
  const [progress, setProgress] = useState(0);
  const [startTs] = useState(() => Date.now());
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
      // 只有在 progress 到 100 並且關鍵圖片已經預載完成時，才結束 loading
      if (!imagesLoaded) return;
      const elapsed = Date.now() - startTs;
      const wait = Math.max(0, minDurationMs - elapsed);
      const t = setTimeout(() => onLoadingComplete && onLoadingComplete(), wait);
      return () => clearTimeout(t);
    }
  }, [progress, onLoadingComplete, minDurationMs, startTs]);

  // 預載關鍵圖片（public/pic 下的圖片，使用 import.meta.env.BASE_URL 作為 base）
  useEffect(() => {
    let mounted = true;
    const base = import.meta.env.BASE_URL;
    const critical = ['pic/text_white.png'];

    const preload = (paths: string[]) => {
      return Promise.all(
        paths.map(
          (p) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.src = `${base}${p}`;
              img.onload = () => resolve();
              img.onerror = () => resolve();
            })
        )
      );
    };

    preload(critical).then(() => {
      if (!mounted) return;
      setImagesLoaded(true);
      // 當圖片載入時，確保進度條能夠到 100（若還沒）
      setProgress((p) => Math.max(p, 100));
    });

    return () => {
      mounted = false;
    };
  }, []);

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
