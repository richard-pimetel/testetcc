// src/utils/constants.ts

// Rotas da aplicação
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/cadastro',
    REGISTER_2: '/cadastro-2',
    DASHBOARD: '/dashboard',
  } as const;
  
  // Mensagens de erro
  export const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'Este campo é obrigatório',
    INVALID_EMAIL: 'Por favor, insira um email válido',
    PASSWORD_MISMATCH: 'As senhas não coincidem',
    PASSWORD_MIN_LENGTH: 'A senha deve ter pelo menos 6 caracteres',
    GENERIC_ERROR: 'Ocorreu um erro. Tente novamente.',
    LOGIN_ERROR: 'Email ou senha incorretos',
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  } as const;
  
  // Mensagens de sucesso
  export const SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: 'Cadastro realizado com sucesso!',
    LOGIN_SUCCESS: 'Login realizado com sucesso!',
    PASSWORD_RESET: 'Email de recuperação enviado!',
  } as const;
  
  // Configurações de validação
  export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 6,
    CPF_LENGTH: 11,
    PHONE_MIN_LENGTH: 10,
  } as const;
  
  // Configurações de API (para uso futuro)
  export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    TIMEOUT: 10000,
    ENDPOINTS: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      FORGOT_PASSWORD: '/auth/forgot-password',
      VERIFY_EMAIL: '/auth/verify-email',
    },
  } as const;
  
  // Keys do localStorage
  export const STORAGE_KEYS = {
    REGISTER_DATA: 'registerData',
    USER_TOKEN: 'userToken',
    USER_DATA: 'userData',
  } as const;
  
  // Configurações do tema
  export const THEME = {
    COLORS: {
      PRIMARY: '#ff6b35',
      SECONDARY: '#f7931e',
      SUCCESS: '#4caf50',
      ERROR: '#f44336',
      WARNING: '#ff9800',
      INFO: '#2196f3',
      LIGHT: '#f5f5f5',
      DARK: '#333333',
    },
    BREAKPOINTS: {
      MOBILE: '480px',
      TABLET: '768px',
      DESKTOP: '1024px',
    },
  } as const;
  
  // Tipos para as constantes
  export type Route = typeof ROUTES[keyof typeof ROUTES];
  export type ErrorMessage = typeof ERROR_MESSAGES[keyof typeof ERROR_MESSAGES];
  export type SuccessMessage = typeof SUCCESS_MESSAGES[keyof typeof SUCCESS_MESSAGES];
  export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];