import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'; // DÜZELTME: Bu satırı ekleyin

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const Experience: React.FC = () => {
  const { t } = useLanguage(); // DÜZELTME: Bu satırı ekleyin

  const experiences: ExperienceItem[] = [
    {
      company: 'DMY Elektrik Otomasyon Aydınlatma',
      position: 'Elektronik Mühendisliği Stajeri',
      period: 'Tem 2025 - Agu 2025',
      location: 'İstanbul, Türkiye',
      description: 'ARM tabanlı sensör devresinin PCB tasarım, gömülü yazılım geliştirme ve saha test süreçlerinde görev aldım. Donanım-yazılım entegrasyonunu test ederek hata ayıklama çalışmalarına katkı sağladım.',
      achievements: [
        'ARM tabanlı sensör devresinin PCB tasarım sürecinde Altium Designer kullanarak şematik çizim ve yerleşim aşamalarına aktif katkı sağladım.',
        'Gömülü C diliyle donanım-yazılım entegrasyonunu test ederek sistemin doğru çalışmasını garanti altına aldım.',
        'Sensör devresinin saha testlerinde veri toplama ve hata ayıklama süreçlerinde görev alarak ürünün doğrulama aşamasına katkıda bulundum.'
      ],
      technologies: ['Altium Designer', 'PCB Design', 'Test']
    },
    {
      company: 'Medel Elektronik ve Mühendislik',
      position: 'Elektronik Mühendisliği Stajeri',
      period: 'Tem 2023 - Eyl 2023',
      location: 'İstanbul, Türkiye',
      description: 'Yüksek Voltaj Konvertörü (YVK) projesinde teknik dokümantasyon analizi, gömülü yazılım inceleme ve hata takibi süreçlerinde çalıştım. Ürün testlerinde mühendis ekibe destek verdim',
      achievements: [
        'Yüksek Voltaj Konvertörü (YVK) projesine ait teknik dokümantasyonları inceleyerek proje gereksinimlerinin uygunluk analizini gerçekleştirdim.',
        'C diliyle yazılmış gömülü yazılım yapısını analiz ederek hata takibi ve sistem optimizasyonu çalışmalarına destek verdim.',
        'Elektronik üretim ve ürün test süreçlerinde mühendis ekiple birlikte çalışarak kalite kontrol ve fonksiyonel doğrulama adımlarına katkıda bulundum.'
      ],
      technologies: ['C', 'Embedded Systems', 'Güç Elektroniği (High Voltage Converter)']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-green-500"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-green-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.position}
                      </h3>
                      <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {exp.company}
                      </h4>
                    </div>
                    {/* Bu kısım mevcut kodunuzda var, `t` ile çevrilebilir hale getirebiliriz */}
                    {exp.company === 'Currently Seeking Opportunities' && (
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        {t('common.current')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      {t('experience.achievements')}
                    </h5>
                    <ul className="space-y-2">
                      {(Array.isArray(exp.achievements) ? exp.achievements : []).map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
