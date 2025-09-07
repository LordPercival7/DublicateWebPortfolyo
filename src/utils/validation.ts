// Form validation utilities
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export const validateField = (value: string, rules: ValidationRule): string | undefined => {
  if (rules.required && !value.trim()) {
    return 'This field is required';
  }

  if (value.trim() && rules.minLength && value.trim().length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (value.trim() && rules.maxLength && value.trim().length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (value.trim() && rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  if (value.trim() && rules.custom) {
    return rules.custom(value);
  }

  return undefined;
};

export const validateForm = (data: Record<string, string>, rules: ValidationRules): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(field => {
    const error = validateField(data[field] || '', rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Common validation rules
export const emailRule: ValidationRule = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  custom: (value) => {
    if (value && !value.includes('@')) return 'Email must contain @';
    if (value && value.length > 254) return 'Email is too long';
    return undefined;
  }
};

export const nameRule: ValidationRule = {
  required: true,
  minLength: 2,
  maxLength: 50,
  custom: (value) => {
    if (value && !/^[a-zA-Z\s'-]+$/.test(value)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return undefined;
  }
};

export const subjectRule: ValidationRule = {
  required: true,
  minLength: 5,
  maxLength: 100
};

export const messageRule: ValidationRule = {
  required: true,
  minLength: 10,
  maxLength: 1000
};

// Sanitization utilities
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const sanitizeFormData = (data: Record<string, string>): Record<string, string> => {
  const sanitized: Record<string, string> = {};
  
  Object.keys(data).forEach(key => {
    sanitized[key] = sanitizeInput(data[key]);
  });
  
  return sanitized;
};