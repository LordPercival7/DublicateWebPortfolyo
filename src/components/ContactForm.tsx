import React, { useState, useRef } from 'react';
import { Mail, Send, Shield, AlertCircle, User, MessageSquare } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { LoadingSpinner } from './LoadingSpinner';
import { NotificationToast } from './NotificationToast';
import { useLanguage } from '../contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  recaptcha?: string;
}

interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
  id: string;
}

export const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const recaptchaRef = useRef<any>(null);

  // Add notification
  const addNotification = (type: Notification['type'], message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { type, message, id }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setErrors(prev => ({ ...prev, recaptcha: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = t('contact.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.emailInvalid');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.emailInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.subjectRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.messageRequired');
    }
    
    if (!recaptchaToken) {
      newErrors.recaptcha = 'reCAPTCHA doğrulaması gerekli.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      addNotification('error', t('contact.generalError')); // Düzeltme yapıldı: Hata mesajı çevirisi eklendi
      setIsSubmitting(false);
      return;
    }

    if (!recaptchaToken) {
      addNotification('error', 'reCAPTCHA doğrulaması gerekli.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        addNotification('success', result.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setRecaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        addNotification('error', result.error || t('contact.generalError'));
      }
    } catch (error) {
      addNotification('error', t('contact.networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('contact.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {t('contact.fullName')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                placeholder={t('contact.fullName')}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                {t('contact.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                placeholder={t('contact.email')}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              {t('contact.subject')} *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.subject
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
              } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              placeholder={t('contact.subject')}
            />
            {errors.subject && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              {t('contact.message')} *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.message
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
              } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              placeholder={t('contact.messagePlaceholder')}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message}
              </p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-semibold">{t('contact.securityVerification')}</span>
            </div>
            
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="YOUR_SITE_KEY" // <<< BURAYI KENDİ SİTE ANAHTARINIZLA DEĞİŞTİRİN
              onChange={onRecaptchaChange}
            />
            
            {errors.recaptcha && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.recaptcha}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  {t('contact.submitting')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.send')}
                </>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">{t('contact.securityPrivacy')}</p>
                <p>
                  {t('contact.privacyText')}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};