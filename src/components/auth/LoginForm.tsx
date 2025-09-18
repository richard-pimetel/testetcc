// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { LoginData, FormChangeEvent, FormSubmitEvent } from '../../types/auth';

interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    senha: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: FormChangeEvent): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: FormSubmitEvent): Promise<void> => {
    e.preventDefault();
    
    if (!formData.email || !formData.senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no login');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && (
        <div className="error-message" style={{ 
          color: 'red', 
          fontSize: '12px', 
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email ou CPF"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <span className="input-icon">📧</span>
      </div>
      
      <div className="input-group">
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <span className="input-icon">🔒</span>
      </div>
      
      <p className="forgot-password">Esqueceu sua senha?</p>
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginForm;