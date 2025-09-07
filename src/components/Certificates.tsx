import React, { useState, useEffect, useRef } from 'react';
import { Award, Calendar, ExternalLink, Filter, Download, X } from 'lucide-react';
import YnlendirmeAnimasyonu from '../assets/Array Antenna/ynlendirme-animasyonu-resize.gif';
import { useLanguage } from '../contexts/LanguageContext';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  credentialId?: string;
  verifyUrl?: string;
  image: string;
  downloadUrl?: string;
}

export const Certificates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();

  const certificates: Certificate[] = [
    {
      id: 'underwater-systems-training',
      title: 'Su Altı Sistemleri Tasarım Eğitimi',
      issuer: 'Uzmanlık Eğitimi',
      date: '2025',
      category: 'Mesleki Gelişim',
      description: 'Su altı araçlarının tasarımı ve mühendisliğine odaklanan kapsamlı bir eğitim. Bu eğitimde, tasarım kriterleri, sistem bileşenleri, çevresel faktörler ve operasyonel gereksinimler gibi konulara dikkat edilerek su altı sistemlerinin nasıl geliştirileceği üzerine bilgi edindim.',
      image: 'https://scontent.fsaw3-1.fna.fbcdn.net/v/t51.82787-15/532432707_18203553577307870_6469722007261703549_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6ipKlzCLi8AQ7kNvwFNL-A3&_nc_oc=AdkSA29_5DdI4nzHaw0NMwtQYmRbcLhI21fXMvY9ylNP9Fp8kCN4eSMngLyE8g-211c&_nc_zt=23&_nc_ht=scontent.fsaw3-1.fna&_nc_gid=C2buQKQWnNBG0monWeNkNQ&oh=00_AfbI9a9FOCzJ46IvzI4ewvooKuAVW-9cntxD35aEUo0c1A&oe=68BEB080'
    },
    {
      id: 'university-career',
      title: 'Kariyer ve Yetkinlik Buluşmaları',
      issuer: 'Savunma Sanayi Akademi',
      date: '2025',
      category: 'Savunma Sanayi',
      description: "Savunma Sanayi Başkanlığı'nın düzenlediği 'Milli Yetkinlik Hamlesi' kapsamında gerçekleştirilen 'Kariyer ve Yetkinlik Buluşmaları-2' etkinliğine katılım.",
      downloadUrl: '/sertifika/Savunma_Sertifika_Tcsiz.pdf',
      image: 'https://www.shutterstock.com/image-vector/icon-turkish-fighter-jet-tai-260nw-2643457673.jpg'
    },
    {
      id: 'thesis-completion',
      title: 'Bitirme Tezi',
      issuer: 'Kocaeli Universitesi',
      date: '2024',
      category: 'Araştırma',
      description: 'Faz dizinli mikroşerit antenlerde hüzme yönlendirme üzerine yapılan ve ileri simülasyon araçlarının kullanıldığı lisans tez projemin tamamlanması',
      downloadUrl: '/Tez/Burak GOKCEK-Bitirme Tezi.pdf',
      image: YnlendirmeAnimasyonu,
    }
  ];

  const categories = ['All', 'Mesleki Gelişim', 'Savunma Sanayi', 'Araştırma'];

  const filteredCertificates = selectedCategory === 'All'
    ? certificates
    : certificates.filter(cert => cert.category === selectedCategory);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedCertificate(null);
      }
    };

    if (selectedCertificate) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedCertificate]);

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('certificates.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('certificates.subtitle')}
          </p>
        </div>

        {/* Kategori Filtresi */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {category === 'All' ? t('common.all') : category}
            </button>
          ))}
        </div>

        {/* Sertifikalar Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((certificate, index) => (
            <div
              key={certificate.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedCertificate(certificate)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {certificate.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {certificate.title}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {certificate.issuer}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {certificate.date}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {certificate.description}
                </p>

                <div className="flex gap-2">
                  {certificate.downloadUrl && (
                    <a
                      href={certificate.downloadUrl}
                      download
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      {t('certificates.download')}
                    </a>
                  )}
                  {certificate.verifyUrl && (
                    <a
                      href={certificate.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {!certificate.downloadUrl && !certificate.verifyUrl && (
                    <div
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center cursor-pointer"
                      onClick={() => setSelectedCertificate(certificate)}
                    >
                      <Award className="w-4 h-4 mr-1" />
                      {t('certificates.viewDetails')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>

              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    {selectedCertificate.issuer}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{t('certificates.issued')}: {selectedCertificate.date}</span>
                </div>
                <div className="flex items-center">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                    {selectedCertificate.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {selectedCertificate.description}
              </p>

              {selectedCertificate.credentialId && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('certificates.credentialId')}</h4>
                  <code className="text-blue-600 dark:text-blue-400 text-sm font-mono">
                    {selectedCertificate.credentialId}
                  </code>
                </div>
              )}

              <div className="flex gap-4">
                {selectedCertificate.downloadUrl && (
                  <a
                    href={selectedCertificate.downloadUrl}
                    download
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {t('certificates.download')}
                  </a>
                )}
                {selectedCertificate.verifyUrl && (
                  <a
                    href={selectedCertificate.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t('certificates.verify')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
