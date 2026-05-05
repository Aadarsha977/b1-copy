import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'flex justify-center pt-4'
            : 'px-6 md:px-12 py-5'
        }`}
      >
        {scrolled ? (
          <motion.div
            layoutId="navbar"
            className="glass-light rounded-full px-6 py-3 flex items-center gap-6 shadow-xl shadow-black/5 max-w-2xl w-full mx-4"
          >
            <span className="font-jakarta font-bold text-obsidian text-lg mr-auto">
              Bright<span className="text-emerald">Smile</span>
            </span>
            <div className="hidden md:flex items-center gap-5">
              {navLinks.slice(1).map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-sm font-inter font-medium text-slate-600 hover:text-emerald transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button
              className="md:hidden text-obsidian"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        ) : (
          <motion.div layoutId="navbar" className="flex items-center justify-between w-full">
            <span className="font-jakarta font-bold text-white text-xl">
              Bright<span className="text-emerald">Smile</span>
            </span>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-sm font-inter font-medium text-white/80 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={24} />
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 glass-light"
          >
            <button
              className="absolute top-6 right-6 text-obsidian"
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNav(link.href)}
                className="text-left text-2xl font-jakarta font-semibold text-obsidian py-4 micro-rule hover:text-emerald transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}