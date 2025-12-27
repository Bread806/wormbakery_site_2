import { Link, useLocation } from 'react-router-dom';
import { Cat } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Works', path: '/works' },
    { name: 'Official SNS', path: '/sns' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/30 border-b border-neon-pink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Cat className="w-8 h-8 text-neon-cyan group-hover:text-neon-pink transition-colors duration-300" />
            <span className="text-xl font-black text-neon-pink group-hover:text-neon-cyan transition-colors duration-300">
              CYBER-POP
            </span>
          </Link>

          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-neon-pink'
                    : 'text-white hover:text-neon-cyan'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-lime animate-pulse"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
