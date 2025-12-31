import React, { useEffect, useState, useRef } from 'react';
import Typewriter from './Typewriter';

type Props = {
  onLoadingComplete?: () => void;
  minDurationMs?: number;
  speedMultiplier?: number;
};

const LoadingScreen: React.FC<Props> = ({ onLoadingComplete, minDurationMs = 2000, speedMultiplier = 1 }) => {
  const [progress, setProgress] = useState(0);
  const [startTs] = useState(() => Date.now());
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const fallbackTimer = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const id = setInterval(() => {
      setProgress((p) => {
        if (!mounted) return p;
        const baseDelta = p < 60 ? Math.random() * 6 + 3 : p < 95 ? Math.random() * 3 + 1 : Math.random() * 1;
        const delta = baseDelta * speedMultiplier;
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

      // 如果圖片已載入，遵守最小顯示時間後結束
      if (imagesLoaded) {
        const t = window.setTimeout(() => onLoadingComplete && onLoadingComplete(), wait);
        return () => window.clearTimeout(t);
      }

      // 圖片尚未載入：設定 fallback timeout（避免永遠等待），在 wait + 2000ms 後強制結束
      const fallback = window.setTimeout(() => onLoadingComplete && onLoadingComplete(), wait + 2000);
      fallbackTimer.current = fallback;
      return () => {
        if (fallbackTimer.current) {
          window.clearTimeout(fallbackTimer.current);
          fallbackTimer.current = null;
        }
      };
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

      // 如果 progress 已達 100，清除 fallback 並在遵守 minDuration 後結束
      if (fallbackTimer.current) {
        window.clearTimeout(fallbackTimer.current);
        fallbackTimer.current = null;
      }

      const elapsed = Date.now() - startTs;
      const wait = Math.max(0, minDurationMs - elapsed);
      if (progress >= 100) {
        const t2 = window.setTimeout(() => onLoadingComplete && onLoadingComplete(), wait);
        // 清除該定時器在 unmount 時
        return () => window.clearTimeout(t2);
      }
      // 否則，讓現有的 progress interval 繼續把進度推到 100
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
