// src/types/auth.ts

// Interface para dados de login
export interface LoginData {
    email: string;
    senha: string;
  }
  
  // Interface para primeira etapa do cadastro
  export interface RegisterData {
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }
  
  // Interface para segunda etapa do cadastro
  export interface RegisterData2 {
    pessoaFisica: string;
    mundo: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }
  
  // Interface para dados completos do usuário
  export interface UserData extends RegisterData {
    pessoaFisica?: string;
    mundo?: string;
    id?: string;
    createdAt?: string;
  }
  
  // Tipos para eventos de formulário
  export type FormChangeEvent = React.ChangeEvent<HTMLInputElement>;
  export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
  
  // Interface para props de componentes de formulário
  export interface AuthFormProps {
    onSubmit: (data: LoginData | RegisterData | RegisterData2) => void;
    loading?: boolean;
  }
  
  // Estados possíveis da autenticação
  export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';
  
  // Interface para contexto de autenticação
  export interface AuthContext {
    user: UserData | null;
    status: AuthStatus;
    login: (data: LoginData) => Promise<void>;
    register: (data: UserData) => Promise<void>;
    logout: () => void;
  }