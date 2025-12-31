import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Works from './pages/Works';
import OfficialSNS from './pages/OfficialSNS';
import LoadingScreen from './components/LoadingScreen';

function App() {
  // 初次進入網站時顯示 loading overlay；路由切換時不再顯示
  const [initialLoading, setInitialLoading] = useState(true);

  // 我們不要在初次 loading 時完全不 render 主應用（那會延後圖片/css 的載入）。
  // 改為讓主應用仍然 mount，但在 visual 上暫時隱藏（visibility/opacity 而非 display），
  // 這樣瀏覽器仍會發出圖片與背景請求，等 Loading 結束後移除 overlay 即可看到正確畫面。

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col">
        {/* 主應用容器；當 initialLoading 時使用 opacity 與 pointer-events 隱藏畫面但仍 mount */}
        <div
          className={initialLoading ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'}
          style={{ transition: 'opacity 300ms ease' }}
          aria-hidden={initialLoading}
        >
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

        {/* Loading overlay - 顯示於最上層，控制何時結束初次 loading */}
        {initialLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <LoadingScreen
              minDurationMs={800}
              speedMultiplier={0.7}
              onLoadingComplete={() => setInitialLoading(false)}
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
