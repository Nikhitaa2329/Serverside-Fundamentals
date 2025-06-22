import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Server, Code, BookOpen, Brain, Zap } from 'lucide-react';

const navGradient = 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400';

const Header = ({ onNavigate, currentSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'modules', label: 'Modules', icon: Brain },
    { id: 'examples', label: 'Examples', icon: Code },
    { id: 'architecture', label: 'Architecture', icon: Server },
    { id: 'quiz', label: 'Quiz', icon: Zap },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-lg shadow-xl border-b border-purple-200' 
          : 'bg-white/30 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ boxShadow: '0 8px 32px 0 rgba(131, 24, 67, 0.10)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Server className="w-9 h-9 text-purple-600 drop-shadow-lg" />
            <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 tracking-tight">
              ServerSide Fundamentals
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-purple-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-5 py-2 rounded-full font-semibold text-base transition-all duration-200 shadow-sm ${
                    currentSection === item.id
                      ? 'text-white ' + navGradient + ' shadow-lg scale-105'
                      : 'text-purple-700 hover:' + navGradient + ' hover:text-white'
                  }`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/60 border border-purple-200 shadow"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7 text-purple-700" />
            ) : (
              <Menu className="w-7 h-7 text-purple-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden py-4 border-t border-purple-200 bg-white/80 rounded-b-2xl shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-full font-semibold text-base transition-all duration-200 shadow-sm ${
                      currentSection === item.id
                        ? 'text-white ' + navGradient + ' shadow-lg scale-105'
                        : 'text-purple-700 hover:' + navGradient + ' hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 