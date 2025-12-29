import React, { useEffect, useState } from 'react';

type Props = {
  text: string | string[]; // 支援單字串或多字串輪播
  speed?: number; // 每個字元的毫秒間隔（預設 40）
  pause?: number; // 每段文字結束後停頓 ms（預設 800）
  loop?: boolean; // 是否輪播多段文字（預設 false）
  className?: string;
};

const Typewriter: React.FC<Props> = ({
  text,
  speed = 40,
  pause = 800,
  loop = false,
  className = '',
}) => {
  const texts = Array.isArray(text) ? text : [text];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let t: number | undefined;

    if (typing) {
      if (charIndex < texts[currentIndex].length) {
        t = window.setTimeout(() => {
          setDisplay((d) => d + texts[currentIndex][charIndex]);
          setCharIndex((i) => i + 1);
        }, speed);
      } else {
        // 文字打完，暫停
        setTyping(false);
        t = window.setTimeout(() => {
          if (loop || currentIndex < texts.length - 1) {
            const next = (currentIndex + 1) % texts.length;
            setCurrentIndex(next);
            setDisplay('');
            setCharIndex(0);
            setTyping(true);
          }
        }, pause);
      }
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [charIndex, currentIndex, texts, typing, speed, pause, loop]);

  return (
    <div className={className}>
      <span>{display}</span>
      <span aria-hidden className="inline-block ml-1 animate-blink">|</span>

      {/* 簡單閃動游標樣式（若使用 Tailwind，請在全域 CSS 加入下列 keyframes） */}
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default Typewriter;