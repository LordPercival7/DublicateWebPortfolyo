import React, { useState, useRef } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { withRetry, handleAsyncError } from '../utils/errorHandler';
import ReCAPTCHA from 'react-google-recaptcha'; // <-- ReCAPTCHA import edildi

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: '' });
  
  // ReCAPTCHA için gerekli state ve ref eklendi
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<any>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'burakgke15@gmail.com',
      link: 'mailto:burakgke15@gmail.com'
    },
    {
      icon: Phone,
      label: t('common.phone'),
      value: '+90 543 526 79 63',
      link: 'tel:+905435267963'
    },
    {
      icon: MapPin,
      label: t('common.location'),
      value: 'Ataşehir, Istanbul, Turkey',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/burakgokcek7/',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/LordPercivall',
      color: 'from-gray-700 to-gray-800'
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:burakgke15@gmail.com',
      color: 'from-green-500 to-green-600'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // ReCAPTCHA değişimini yakalayan fonksiyon
  const onRecaptchaChange = (token: string | null) => {
      setRecaptchaToken(token);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setFormStatus({ type: 'error', message: t('contact.nameRequired') });
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setFormStatus({ type: 'error', message: t('contact.emailInvalid') });
      return false;
    }
    if (!formData.subject.trim()) {
      setFormStatus({ type: 'error', message: t('contact.subjectRequired') });
      return false;
    }
    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: t('contact.messageRequired') });
      return false;
    }
    // ReCAPTCHA token'ı kontrolü eklendi
    if (!recaptchaToken) {
      setFormStatus({ type: 'error', message: 'Lütfen reCAPTCHA doğrulaması yapın.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: null, message: '' });

    if (!validateForm()) {
        setIsSubmitting(false);
        return;
    }
    
    setIsSubmitting(true);
    
    const submitForm = handleAsyncError(async () => {
      return await withRetry(async () => {
        // Form verileri ve reCAPTCHA token'ı ile Netlify fonksiyonuna POST isteği
        const response = await fetch("/.netlify/functions/contact-form", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ ...formData, recaptchaToken }) // Token da gönderiliyor
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || t('contact.generalError'));
        }

        return response;
      }, 3, 1000);
    });

    try {
      const response = await submitForm();
      
      if (response) {
        setFormStatus({
          type: 'success',
          message: t('contact.success')
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // ReCAPTCHA'yı sıfırla
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);

      } else {
        setFormStatus({
          type: 'error',
          message: t('contact.generalError')
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : t('contact.networkError')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.info')}
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg mr-4">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{info.label}</div>
                      <div className="text-gray-900 dark:text-white font-semibold">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.connect')}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-gradient-to-r ${social.color} text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300`}
                    title={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('contact.collaborate')}</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('contact.collaborateText')}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('contact.sendMessage')}
            </h3>

            {formStatus.type && (
              <div className={`mb-6 p-4 rounded-lg flex items-center ${
                formStatus.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {formStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.fullName')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
                    placeholder={t('contact.fullName')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.subject')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
                  placeholder={t('contact.subject')}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200 resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                  required
                ></textarea>
              </div>
              
              {/* reCAPTCHA bileşeni buraya gelecek */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="YOUR_SITE_KEY" // <<< Kendi Site Anahtarınızla değiştirin
                  onChange={onRecaptchaChange}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {t('contact.submitting')}
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('contact.send')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};