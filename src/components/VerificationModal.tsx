import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Clock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface VerificationModalProps {
  email: string;
  verificationCode: string;
  onSuccess: () => void;
  onClose: () => void;
  onResendCode: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  email,
  verificationCode,
  onSuccess,
  onClose,
  onResendCode
}) => {
  const [inputCode, setInputCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for code expiration
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setError('Verification code has expired. Please request a new one.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...inputCode];
    newCode[index] = value;
    setInputCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !inputCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setInputCode(newCode);
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (code: string) => {
    if (timeLeft <= 0) {
      setError('Verification code has expired. Please request a new one.');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (code === verificationCode) {
        await onSuccess();
      } else {
        setError('Invalid verification code. Please try again.');
        setInputCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    if (!canResend || resendCooldown > 0) return;
    
    onResendCode();
    setCanResend(false);
    setResendCooldown(60); // 1 minute cooldown
    setInputCode(['', '', '', '', '', '']);
    setError('');
    setTimeLeft(300); // Reset timer
    inputRefs.current[0]?.focus();
  };

  const handleManualVerify = () => {
    const code = inputCode.join('');
    if (code.length === 6) {
      handleVerify(code);
    } else {
      setError('Please enter all 6 digits');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We've sent a 6-digit code to
          </p>
          <p className="font-semibold text-blue-600 dark:text-blue-400">
            {email}
          </p>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center mb-6">
          <div className={`flex items-center px-4 py-2 rounded-lg ${
            timeLeft <= 60 
              ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
              : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
          }`}>
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-mono font-semibold">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Code Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
            Enter Verification Code
          </label>
          <div className="flex justify-center space-x-3" onPaste={handlePaste}>
            {inputCode.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                value={digit}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                maxLength={1}
                autoComplete="off"
              />
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleManualVerify}
            disabled={isVerifying || inputCode.some(digit => !digit) || timeLeft <= 0}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
          >
            {isVerifying ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Verify Code
              </>
            )}
          </button>

          <button
            onClick={handleResend}
            disabled={!canResend || resendCooldown > 0}
            className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {resendCooldown > 0 
              ? `Resend Code (${resendCooldown}s)` 
              : 'Resend Code'
            }
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Didn't receive the code? Check your spam folder or try resending.</p>
          <p className="mt-1">
            <strong>Demo Mode:</strong> The verification code is displayed in the browser console and alert.
          </p>
        </div>
      </div>
    </div>
  );
};