import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Works from './pages/Works';
import OfficialSNS from './pages/OfficialSNS';
import LoadingScreen from './components/LoadingScreen';

function App() {
  // 全域首次載入遮罩：在使用者第一次進入網站時顯示 LoadingScreen，
  // 同時預載重要圖片以避免首屏圖像不顯示的現象。
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // 要預載的關鍵圖片（可按需加入更多）
    const assets = [import.meta.env.BASE_URL + 'pic/text_white.png'];

    const loaders = assets.map((src) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        // 如果瀏覽器快取或無法載入，也不阻塞
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }),
    );

    // fire-and-forget preload; 不會自行關閉 loading，必須等 LoadingScreen 回報完成
    void Promise.all(loaders);
  }, []);

  if (initialLoading) {
    // 交由 LoadingScreen 處理進度動畫；如果 LoadingScreen 自己完成，我們也會把 initialLoading 設 false
    return <LoadingScreen minDurationMs={800} onLoadingComplete={() => setInitialLoading(false)} />;
  }

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/works" element={<Works />} />
            <Route path="/sns" element={<OfficialSNS />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
