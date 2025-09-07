import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'; // DÜZELTME: Bu satırı ekleyin

export const Education = () => {
  const { t } = useLanguage(); // DÜZELTME: Bu satırı ekleyin

  const educationEntries = [
    {
      degree: 'Elektronk ve Haberleşme Mühendisliği',
      university: 'Kocaeli Universitesi',
      period: '2020 - 2025',
      location: 'Kocaeli, Türkiye',
      gpa: '2.71/4.0',
      thesis: 'Faz Dizinli Mikroşerit Antenlerde Hüzme Tarama',
      type: 'university'
    },
    {
      degree: 'Lise Mezuniyeti',
      university: 'Habire Yahşi Anadolu Lisesi',
      period: '2014 - 2018',
      location: 'İstanbul, Türkiye',
      gpa: '78/100',
      thesis: null,
      type: 'highschool'
    }
  ];
  
  const relevantCourses = [
    'İnsansız Araçlar',
    'Radar Sistemleri',
    'Optik Haberleşme Sistemleri',
    'Mikrodalga Mühendisliği',
    'Mikrodalga Devre Tasarımı',
    'Elektromagnetik Alan ve Dalga Teorisi',
    'İmge İşleme',
    'Analog ve Sayısal Haberleşme',
    'Sayısal tasarım',
    'Güç Elektroniği Uygulamaları'
  ];

  const academicProjects = [
    {
      title: 'MSP430 Ses Kontrollü Disko Işık Sistemi',
      description: "Bir mikrodenetleyici kullanarak sesin seviyesini algılayan ve buna göre LED'leri kontrol eden bir gömülü sistem projesi.",
      technologies: ['MSP430 Microcontroller', 'Altium Designer', 'Audio Processing']
    },
    {
      title: 'STM32 OLED Zaman Kontrollü Buton Sayacı',
      description: 'STM32 tabanlı, bir OLED ekran üzerinde zaman ve buton sayımı yapan bir gömülü sistem yazılımı',
      technologies: ['STM32', 'C/C++', 'OLED Display']
    },
    {
      title: 'Fazlı Dizi Mikroşerit Antenlerde Işın Yönlendirme',
      description: 'Birden fazla anten elemanının faz farklarını kullanarak elektromanyetik ışını belirli bir yöne yönlendirme üzerine bir tez çalışması.',
      technologies: ['CST Studio Suite', 'Antenna Design', 'MATLAB']
    },
    {
      title: 'DC Güç Kaynağı',
      description: 'Ayarlanabilir bir DC güç kaynağı devresi tasarlayarak şematik ve PCB çizimi yapılması.',
      technologies: ['Altium Designer', 'Multisim (circuit simulation)', 'Analog Circuit Design']
    },
      {
      title: 'Ses Kontrollü DC Motor Sistemi',
      description: 'Ses sinyallerine göre bir DC motorun dönüş hızını ve yönünü kontrol eden klasik bir kontrol sistemi',
      technologies: ['Multisim', 'Altium Designer', 'Analog Circuit Design']
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('education.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('education.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {educationEntries.map((education, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 mb-12 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {education.degree}
                      </h3>
                      <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                        {education.university}
                      </h4>
                    </div>
                    <div className="flex gap-4 mt-4 lg:mt-0">
                      <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        GPA: {education.gpa}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {education.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {education.location}
                    </div>
                  </div>
                  
                  {education.thesis && (
                    <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 mb-6">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {t('education.thesis.title')} {/* DÜZELTME: thesis başlığı için doğru key */}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-400">
                        {education.thesis}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                {t('education.coursework.title')}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {relevantCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-600" />
                {t('education.academicProjects.title')}
              </h3>
              <div className="space-y-6">
                {academicProjects.map((project, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};