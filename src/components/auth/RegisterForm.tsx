// src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { RegisterData, FormChangeEvent, FormSubmitEvent } from '../../types/auth';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  loading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<RegisterData>({
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: ''
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

  const validateForm = (): boolean => {
    const requiredFields: (keyof RegisterData)[] = [
      'nomeCompleto', 'cpf', 'telefone', 'email', 'senha', 'confirmarSenha'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`O campo ${field} é obrigatório`);
        return false;
      }
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem!');
      return false;
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormSubmitEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no cadastro');
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
          type="text"
          name="nomeCompleto"
          placeholder="Nome Completo *"
          value={formData.nomeCompleto}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      
      <div className="input-group">
        <input
          type="text"
          name="cpf"
          placeholder="CPF *"
          value={formData.cpf}
          onChange={handleChange}
          required
          disabled={loading}
          maxLength={14}
        />
      </div>
      
      <div className="input-group">
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone *"
          value={formData.telefone}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      
      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="E-mail *"
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
          placeholder="Senha *"
          value={formData.senha}
          onChange={handleChange}
          required
          disabled={loading}
          minLength={6}
        />
        <span className="input-icon">🔒</span>
      </div>
      
      <div className="input-group">
        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirme a senha *"
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <span className="input-icon">🔒</span>
      </div>
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? 'Processando...' : 'Continuar'}
      </button>
    </form>
  );
};

export default RegisterForm;