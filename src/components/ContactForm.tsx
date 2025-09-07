import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, Shield, Clock, RefreshCw, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import { VerificationModal } from './VerificationModal';
import { LoadingSpinner } from './LoadingSpinner';
import { NotificationToast } from './NotificationToast';

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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
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

  // Initialize reCAPTCHA
  useEffect(() => {
    const initRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render) {
        try {
          if (recaptchaRef.current && !recaptchaRef.current.hasChildNodes()) {
            window.grecaptcha.render(recaptchaRef.current, {
              sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test key
              callback: (token: string) => {
                setRecaptchaToken(token);
                setErrors(prev => ({ ...prev, recaptcha: undefined }));
              },
              'expired-callback': () => {
                setRecaptchaToken(null);
                setErrors(prev => ({ ...prev, recaptcha: 'reCAPTCHA expired. Please verify again.' }));
              }
            });
          }
        } catch (error) {
          console.error('reCAPTCHA initialization error:', error);
        }
      }
    };

    if (window.grecaptcha) {
      initRecaptcha();
    } else {
      window.addEventListener('load', initRecaptcha);
    }

    return () => {
      window.removeEventListener('load', initRecaptcha);
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    // reCAPTCHA validation
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please complete the reCAPTCHA verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const simulateEmailSend = async (email: string, code: string): Promise<boolean> => {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, show the code in console and alert
    console.log(`📧 Verification code sent to ${email}: ${code}`);
    alert(`Demo Mode: Verification code sent to ${email}\nCode: ${code}\n\n(In production, this would be sent via email)`);
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addNotification('error', 'Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate verification code
      const code = generateVerificationCode();
      setVerificationCode(code);

      // Simulate sending verification email
      const emailSent = await simulateEmailSend(formData.email, code);
      
      if (emailSent) {
        setShowVerification(true);
        addNotification('info', 'Verification code sent to your email');
      } else {
        throw new Error('Failed to send verification email');
      }
    } catch (error) {
      addNotification('error', 'Failed to send verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSuccess = async () => {
    try {
      // Simulate sending the actual contact message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addNotification('success', 'Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setRecaptchaToken(null);
      setShowVerification(false);
      
      // Reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch (error) {
      addNotification('error', 'Failed to send message. Please try again.');
    }
  };

  const handleVerificationClose = () => {
    setShowVerification(false);
    setVerificationCode('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Send us a message and we'll get back to you as soon as possible. 
          Your message will be verified for security.
        </p>
      </div>

      {/* Main Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
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
                placeholder="Enter your full name"
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
                Email Address *
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
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Subject *
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
              placeholder="What's this about?"
            />
            {errors.subject && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.message 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
              } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              placeholder="Tell us about your project, requirements, or any questions you have..."
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
              <span className="font-semibold">Security Verification</span>
            </div>
            
            <div 
              ref={recaptchaRef}
              className="flex justify-center"
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
                  Sending Verification Code...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Security & Privacy</p>
                <p>
                  Your message will be verified via email before being sent. We use reCAPTCHA to prevent spam 
                  and protect against automated submissions. Your information is secure and will never be shared.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Verification Modal */}
      {showVerification && (
        <VerificationModal
          email={formData.email}
          verificationCode={verificationCode}
          onSuccess={handleVerificationSuccess}
          onClose={handleVerificationClose}
          onResendCode={() => {
            const newCode = generateVerificationCode();
            setVerificationCode(newCode);
            simulateEmailSend(formData.email, newCode);
            addNotification('info', 'New verification code sent');
          }}
        />
      )}

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

// Helper functions
const simulateEmailSend = async (email: string, code: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`📧 Verification code sent to ${email}: ${code}`);
  return true;
};