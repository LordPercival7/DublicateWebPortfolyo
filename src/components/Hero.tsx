import React, { useState, useEffect } from 'react';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const { t } = useLanguage();

  // Düzeltme: Yetenekler listesini LanguageContext'ten dinamik olarak al.
  const skills = t('hero.skills');

  useEffect(() => {
    // Check if skills is a valid array before setting the interval
    if (Array.isArray(skills) && skills.length > 0) {
      const interval = setInterval(() => {
        setCurrentSkill((prev) => (prev + 1) % skills.length);
      }, 2000);

      return () => clearInterval(interval);
    }
    // Cleanup if skills is not an array
    return undefined;
  }, [skills]); // Add skills to dependency array to re-run effect when language changes

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 dark:from-blue-800/30 dark:via-purple-800/30 dark:to-indigo-800/30"></div>
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Burak <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Gökçek</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t('hero.title')}
          </h2>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 h-8 flex items-center justify-center">
            <span>{t('hero.specializing')} </span>
            <span className="ml-2 text-blue-600 dark:text-blue-400 font-semibold min-w-48 text-left">
              {/* Düzeltme: skills dizisini kullanmadan önce kontrol et */}
              {Array.isArray(skills) && skills.length > 0 ? skills[currentSkill] : ''}
            </span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => scrollToSection('#projects')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {t('hero.viewProjects')}
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transform hover:scale-105 transition-all duration-200"
          >
            <Mail className="w-5 h-5 inline mr-2" />
            {t('hero.getInTouch')}
          </button>
          <a
            href="/CV/Burak_Gokcek_CV.pdf"
            download="Burak_Gokcek_CV.pdf"
            className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            {t('hero.downloadCV')}
          </a>
        </div>

        <button
          onClick={() => scrollToSection('#about')}
          className="animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto" />
        </button>
      </div>
    </section>
  );
};