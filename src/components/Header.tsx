import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#education', label: t('nav.education') },
    { href: '#certificates', label: t('nav.certificates') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-600">B</span>urak<span className="text-green-500">G</span>ökçek
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage('tr')}
                className={`w-8 h-6 rounded overflow-hidden border-2 transition-all duration-200 ${
                  language === 'tr' ? 'border-blue-500 shadow-lg' : 'border-gray-300 dark:border-gray-600'
                }`}
                title="Türkçe"
              >
                <img
                  src="https://flagcdn.com/w40/tr.png"
                  alt="Turkish"
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`w-8 h-6 rounded overflow-hidden border-2 transition-all duration-200 ${
                  language === 'en' ? 'border-blue-500 shadow-lg' : 'border-gray-300 dark:border-gray-600'
                }`}
                title="English"
              >
                <img
                  src="https://flagcdn.com/w40/gb.png"
                  alt="English"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setLanguage('tr')}
                className={`w-6 h-4 rounded overflow-hidden border transition-all duration-200 ${
                  language === 'tr' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <img
                  src="https://flagcdn.com/w40/tr.png"
                  alt="TR"
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`w-6 h-4 rounded overflow-hidden border transition-all duration-200 ${
                  language === 'en' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <img
                  src="https://flagcdn.com/w40/gb.png"
                  alt="EN"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};