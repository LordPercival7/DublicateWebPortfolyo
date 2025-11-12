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
      {/* Gradient Background - using sky blue and teal instead of purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-teal-500/10 to-emerald-500/10 dark:from-sky-800/20 dark:via-teal-800/20 dark:to-emerald-800/20"></div>
      
      {/* Geometric Shapes with floating animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.75s' }}></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            Burak <span className="gradient-text">Gökçek</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {t('hero.title')}
          </h2>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 h-10 flex items-center justify-center gap-2">
            <span>{t('hero.specializing')}</span>
            <span className="relative inline-block min-w-[250px]">
              {Array.isArray(skills) && skills.length > 0 && (
                <span
                  key={currentSkill}
                  className="absolute left-0 text-sky-600 dark:text-sky-400 font-semibold animate-fade-in"
                >
                  {skills[currentSkill]}
                </span>
              )}
            </span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-scale-in">
          <button
            onClick={() => scrollToSection('#projects')}
            className="group px-8 py-4 bg-gradient-to-r from-sky-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-sky-500/50"
          >
            {t('hero.viewProjects')}
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="group px-8 py-4 border-2 border-sky-600 dark:border-sky-500 text-sky-600 dark:text-sky-400 rounded-xl font-semibold hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 dark:hover:text-white transform hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-5 h-5 inline mr-2 group-hover:animate-bounce" />
            {t('hero.getInTouch')}
          </button>
          <a
            href="/CV/Burak_Gokcek_CV.pdf"
            download="Burak_Gokcek_CV.pdf"
            className="group px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
          >
            <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
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