import React from 'react';
import { Cpu, Zap, Settings, Radio, Code, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SkillCategory {
  title: string;
  icon: React.ComponentType<any>;
  skills: string[];
  color: string;
}

export const Skills: React.FC = () => {
  const { t } = useLanguage();
  
  const skillCategories: SkillCategory[] = [
    {
      title: t('skills.hardware'),
      icon: Cpu,
      color: 'from-blue-500 to-blue-600',
      skills: [
        'Altium Designer',
        'PCB Tasarımı ve Üretimi',
        'Şematik Çizimi',
        'Analog Devre Tasarımı',
        'Breadboard ve prototipleme'
      ]
    },
    {
      title: t('skills.embedded'),
      icon: Code,
      color: 'from-green-500 to-green-600',
      skills: [
        'C Programlama',
        'STM32CubeIDE',
        'IAR Embedded Workbench',
        'Keil uVision5',
        'Vivado & Quartus'
      ]
    },
    {
      title: t('skills.rf'),
      icon: Settings,
      color: 'from-purple-500 to-purple-600',
      skills: [
        'CST Studio Suite',
        'Mikroşerit Anten Tasarımı',
        'Dizi Antenlerde Hüzme Yönlendirme',
        'S-Parametre Analizi(VNA)'
      ]
    },
    {
      title: t('skills.simulation'),
      icon: Radio,
      color: 'from-orange-500 to-orange-600',
      skills: [
        'MATLAB/Simulink',
        'NI Multisim',
        'PLECS'
      ]
    },
    {
      title: t('skills.software'),
      icon: Zap,
      color: 'from-teal-500 to-teal-600',
      skills: [
        'Microsoft Office',
        'Adobe Premiere',
        'Canva',
        'VSCode'
      ]
    },
    {
      title: t('skills.languages'),
      icon: Wrench,
      color: 'from-red-500 to-red-600',
      skills: [
        'Türkçe (Ana Dil)',
        'İngilizce'
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mr-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-200">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} mr-3 flex-shrink-0`}></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};