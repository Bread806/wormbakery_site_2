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

  // 如果還在初次 loading，先只顯示 LoadingScreen（不要渲染主應用內容）
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingScreen
          minDurationMs={800}
          onLoadingComplete={() => setInitialLoading(false)}
        />
      </div>
    );
  }

  return (
    <Router>
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
