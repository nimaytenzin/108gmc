import { motion } from 'framer-motion';
import { Home, Map, Globe } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const views = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/procession', icon: Map, label: 'Patrons' },
  { to: '/map', icon: Globe, label: 'Map View' },
];

export default function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000]">
      <div className="w-full flex justify-between items-center bg-burgundy/95 backdrop-blur-md border border-gold/20 px-5 py-3 shadow-lg shadow-burgundy-dark/50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold flex items-center justify-center text-burgundy font-display font-bold text-sm">
            108
          </div>
          <div>
            <h1 className="font-display text-base leading-none tracking-widest text-gold uppercase">
              Project 108
            </h1>
            <p className="text-xs text-bronze uppercase tracking-widest font-body mt-0.5">
              Gelephu Mindfulness City
            </p>
          </div>
        </Link>

        {/* View Toggle */}
        <div className="hidden md:flex border border-gold/20 p-1">
          {views.map((view) => (
            <NavLink
              key={view.to}
              to={view.to}
              className="relative flex items-center gap-2 px-5 py-2 text-xs font-display tracking-widest uppercase transition-colors duration-108"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gold/10 border border-gold/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <view.icon
                    size={13}
                    className={`relative z-10 transition-colors duration-108 ${
                      isActive ? 'text-gold' : 'text-bronze'
                    }`}
                  />
                  <span
                    className={`relative z-10 transition-colors duration-108 ${
                      isActive ? 'text-gold' : 'text-bronze'
                    }`}
                  >
                    {view.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        {isHome ? (
          <a
            href="#footer"
            className="bg-gold text-burgundy px-5 py-2.5 font-display text-xs tracking-widest uppercase hover:bg-gold/90 transition-all duration-108"
          >
            Sponsor a Jangchub Chorten
          </a>
        ) : (
          <Link
            to="/"
            className="bg-gold text-burgundy px-5 py-2.5 font-display text-xs tracking-widest uppercase hover:bg-gold/90 transition-all duration-108"
          >
            Back to Home
          </Link>
        )}
      </div>
    </nav>
  );
}
