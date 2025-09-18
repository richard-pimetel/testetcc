// src/utils/validation.ts
import { ERROR_MESSAGES, VALIDATION } from './constants';

// Validação de email
export const validateEmail = (email: string): string | null => {
  if (!email) return ERROR_MESSAGES.REQUIRED_FIELD;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }
  
  return null;
};

// Validação de senha
export const validatePassword = (password: string): string | null => {
  if (!password) return ERROR_MESSAGES.REQUIRED_FIELD;
  
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
  }
  
  return null;
};

// Validação de confirmação de senha
export const validatePasswordConfirm = (
  password: string, 
  confirmPassword: string
): string | null => {
  if (!confirmPassword) return ERROR_MESSAGES.REQUIRED_FIELD;
  
  if (password !== confirmPassword) {
    return ERROR_MESSAGES.PASSWORD_MISMATCH;
  }
  
  return null;
};

// Validação de CPF (básica)
export const validateCPF = (cpf: string): string | null => {
  if (!cpf) return ERROR_MESSAGES.REQUIRED_FIELD;
  
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== VALIDATION.CPF_LENGTH) {
    return 'CPF deve ter 11 dígitos';
  }
  
  // Verifica se não são todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return 'CPF inválido';
  }
  
  return null;
};

// Validação de telefone (básica)
export const validatePhone = (phone: string): string | null => {
  if (!phone) return ERROR_MESSAGES.REQUIRED_FIELD;
  
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length < VALIDATION.PHONE_MIN_LENGTH) {
    return 'Telefone deve ter pelo menos 10 dígitos';
  }
  
  return null;
};

// Validação de campo obrigatório
export const validateRequired = (value: string, fieldName?: string): string | null => {
  if (!value || value.trim() === '') {
    return fieldName ? `${fieldName} é obrigatório` : ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  return null;
};

// Formatação de CPF
export const formatCPF = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  const match = cleanValue.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  
  return cleanValue;
};

// Formatação de telefone
export const formatPhone = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 10) {
    const match = cleanValue.match(/^(\d{2})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  } else {
    const match = cleanValue.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  }
  
  return cleanValue;
};

// Validador genérico para objetos
export const createValidator = <T extends Record<string, string>>(
  rules: Partial<Record<keyof T, (value: string) => string | null>>
) => {
  return (values: T): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};
    
    Object.keys(rules).forEach(key => {
      const field = key as keyof T;
      const validator = rules[field];
      
      if (validator) {
        const error = validator(values[field]);
        if (error) {
          errors[field] = error;
        }
      }
    });
    
    return errors;
  };
};