import React from 'react';
import { Code, Cpu, Zap, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  
  const stats = [
    { icon: Code, value: '12+', label: t('about.stats.projects') },
    { icon: Cpu, value: '2025', label: t('about.stats.graduate') },
    { icon: Zap, value: '10+', label: t('about.stats.technologies') },
    { icon: Award, value: '2.71', label: t('about.stats.gpa') },
  ];


  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="w-80 h-80 mx-auto lg:mx-0 bg-gradient-to-br from-blue-200 to-green-200 dark:from-blue-800 to-green-800 rounded-2xl flex items-center justify-center">
              <div className="w-72 h-72 bg-gray-300 dark:bg-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
  src="/PP/IMG_6971.jpeg" 
  alt="Burak Gökçek profil fotoğrafı" 
  className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover object-[%_50%] transform scale-150" 
/>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('about.mainTitle')}
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                {t('about.description1')}
              </p>
              <p>
                {t('about.description2')}
              </p>
              <p>
                {t('about.description3')}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
