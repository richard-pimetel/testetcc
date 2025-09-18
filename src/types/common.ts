// src/types/common.ts

// Tipos básicos para componentes
export interface BaseProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  // Props para botões
  export interface ButtonProps extends BaseProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
  }
  
  // Props para inputs
  export interface InputProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'email' | 'password' | 'tel' | 'number';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    maxLength?: number;
    minLength?: number;
    icon?: string;
  }
  
  // Estados de loading
  export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
  
  // Resposta padrão da API
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
  }
  
  // Configurações de navegação
  export interface NavigationItem {
    path: string;
    label: string;
    icon?: string;
    protected?: boolean;
  }
  
  // Props para modal
  export interface ModalProps extends BaseProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'small' | 'medium' | 'large';
  }
  
  // Props para layouts
  export interface LayoutProps extends BaseProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    sidebar?: React.ReactNode;
  }
  
  // Tipos para formulários
  export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'tel' | 'select' | 'textarea';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    validation?: {
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      custom?: (value: string) => string | null;
    };
  }
  
  // Estados de erro
  export interface ErrorState {
    hasError: boolean;
    message: string;
    field?: string;
  }
  
  // Contexto de tema
  export interface ThemeContext {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
  }
  
  // Tipos para notificações
  export type NotificationType = 'success' | 'error' | 'warning' | 'info';
  
  export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    duration?: number;
  }
  
  // Props para componentes de feedback
  export interface FeedbackProps {
    type: NotificationType;
    message: string;
    onClose?: () => void;
  }