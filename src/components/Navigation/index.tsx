import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, Globe, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const views = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/procession', icon: Map, label: 'Patrons' },
  { to: '/map', icon: Globe, label: 'Map View' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000]">
      <div className="w-full flex justify-between items-center bg-burgundy/95 backdrop-blur-md border-b border-gold/20 px-4 md:px-5 py-3 shadow-lg shadow-burgundy-dark/50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gold flex items-center justify-center text-burgundy font-display font-bold text-sm flex-shrink-0">
            108
          </div>
          <div>
            <h1 className="font-display text-sm md:text-base leading-none tracking-widest text-gold uppercase">
              Project 108
            </h1>
            <p className="text-xs text-bronze uppercase tracking-widest font-body mt-0.5 hidden sm:block">
              Gelephu Mindfulness City
            </p>
          </div>
        </Link>

        {/* Desktop view toggle */}
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
                  <view.icon size={13} className={`relative z-10 transition-colors duration-108 ${isActive ? 'text-gold' : 'text-bronze'}`} />
                  <span className={`relative z-10 transition-colors duration-108 ${isActive ? 'text-gold' : 'text-bronze'}`}>
                    {view.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Link
            to="/sponsor"
            className="hidden md:block bg-gold text-burgundy px-5 py-2.5 font-display text-xs tracking-widest uppercase hover:bg-gold/90 transition-all duration-108"
          >
            Sponsor a Jangchub Chorten
          </Link>

          {/* Mobile sponsor shortcut */}
          <Link
            to="/sponsor"
            className="md:hidden bg-gold text-burgundy px-3 py-2 font-display text-xs tracking-widest uppercase hover:bg-gold/90 transition-all duration-108"
            onClick={() => setMenuOpen(false)}
          >
            Sponsor
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden w-9 h-9 border border-gold/20 flex items-center justify-center text-bronze hover:text-gold hover:border-gold/40 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-burgundy border-b border-gold/20"
          >
            {views.map((view) => (
              <NavLink
                key={view.to}
                to={view.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-4 border-b border-gold/10 font-display text-xs tracking-widest uppercase transition-colors ${
                    isActive ? 'text-gold bg-gold/5' : 'text-bronze'
                  }`
                }
              >
                <view.icon size={14} strokeWidth={1.5} />
                {view.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
