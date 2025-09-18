// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterData, FormChangeEvent, FormSubmitEvent } from '../types/auth';
import '../styles/components/auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: FormChangeEvent): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro quando o usuário começa a digitar
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    const requiredFields: (keyof RegisterData)[] = [
      'nomeCompleto', 'cpf', 'telefone', 'email', 'senha', 'confirmarSenha'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`O campo ${field} é obrigatório`);
        return false;
      }
    }

    // Valida se as senhas coincidem
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem!');
      return false;
    }

    // Valida tamanho mínimo da senha
    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormSubmitEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!validateForm()) {
        return;
      }

      // Salvar dados temporariamente no localStorage
      localStorage.setItem('registerData', JSON.stringify(formData));
      
      // Redireciona para a segunda etapa
      navigate('/cadastro-2');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no cadastro');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = (): void => {
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <button 
          className="back-btn" 
          onClick={handleBackClick}
          type="button"
          aria-label="Voltar"
        >
          ←
        </button>
        <span className="page-title">cadastro</span>
      </div>
      
      <div className="auth-content">
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-text">INFO</span>
            <span className="logo-text-hub">HUB</span>
          </div>
        </div>
        
        <div className="character-section">
          <div className="character">👨‍💼</div>
          <p className="form-label">Pessoa Física</p>
          <p className="form-sublabel">Pessoa Jurídica</p>
        </div>
        
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
          
          <p className="register-note">
            Não tem problema, esquece!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;