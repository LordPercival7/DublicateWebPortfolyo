import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaRef.current) {
      alert('reCAPTCHA yüklenemedi. Lütfen tekrar deneyin.');
      return;
    }

    // reCAPTCHA v2'den token'ı alıyoruz
    const recaptchaToken = recaptchaRef.current.getValue();

    if (!recaptchaToken) {
      alert('Lütfen reCAPTCHA doğrulamasını tamamlayın.');
      return;
    }
    
    try {
      // Form verileri ve reCAPTCHA token'ı ile Netlify fonksiyonuna POST isteği
      const response = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        // Formu temizle ve reCAPTCHA'yı sıfırla
        setFormData({ name: '', email: '', subject: '', message: '' });
        recaptchaRef.current.reset();
      } else {
        alert(result.error || 'Bir hata oluştu.');
      }
    } catch (error) {
      alert('Ağ hatası: Lütfen bağlantınızı kontrol edin.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact.fullName')}</label>
        <input 
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact.email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact.subject')}</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact.message')}</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>
      
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="YOUR_SITE_KEY" // <<< BURAYI KENDİ ANAHTARINIZLA DEĞİŞTİRİN
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        {t('contact.send')}
      </button>
    </form>
  );
};