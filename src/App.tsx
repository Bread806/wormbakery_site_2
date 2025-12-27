import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Works from './pages/Works';
import OfficialSNS from './pages/OfficialSNS';

function App() {
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
