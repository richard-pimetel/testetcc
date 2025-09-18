// src/hooks/useForm.ts
import { useState, useCallback } from 'react';
import { FormChangeEvent } from '../types/auth';

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  loading: boolean;
  handleChange: (e: FormChangeEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFieldValue: (field: keyof T, value: string) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  resetForm: () => void;
  isValid: boolean;
}

export const useForm = <T extends Record<string, string>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = useCallback((e: FormChangeEvent): void => {
    const { name, value } = e.target;
    
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof T]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }, [errors]);

  const setFieldValue = useCallback((field: keyof T, value: string): void => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string): void => {
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    if (!validate) return true;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  const handleSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!onSubmit) return;

    setLoading(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  }, [values, validateForm, onSubmit]);

  const resetForm = useCallback((): void => {
    setValues(initialValues);
    setErrors({});
    setLoading(false);
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0 && 
                 Object.values(values).every(value => value.trim() !== '');

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    setErrors,
    resetForm,
    isValid,
  };
};