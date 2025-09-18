// src/pages/Register2.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterData, RegisterData2, UserData, FormChangeEvent, FormSubmitEvent } from '../types/auth';
import '../styles/components/auth.css';

const Register2: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData2>({
    pessoaFisica: '',
    mundo: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Recuperar dados da primeira etapa
    const savedData = localStorage.getItem('registerData');
    if (savedData) {
      try {
        const parsedData: RegisterData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          email: parsedData.email,
          senha: parsedData.senha,
          confirmarSenha: parsedData.confirmarSenha
        }));
      } catch (err) {
        console.error('Erro ao recuperar dados do cadastro:', err);
        navigate('/cadastro'); // Volta para primeira etapa se houver erro
      }
    } else {
      // Se não há dados da primeira etapa, redireciona
      navigate('/cadastro');
    }
  }, [navigate]);

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
    const requiredFields: (keyof RegisterData2)[] = [
      'pessoaFisica', 'mundo', 'email', 'senha', 'confirmarSenha'
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

      // Recuperar todos os dados do cadastro
      const savedDataString = localStorage.getItem('registerData');
      if (!savedDataString) {
        throw new Error('Dados da primeira etapa não encontrados');
      }

      const firstStepData: RegisterData = JSON.parse(savedDataString);
      
      const allData: UserData = {
        ...firstStepData,
        pessoaFisica: formData.pessoaFisica,
        mundo: formData.mundo,
        createdAt: new Date().toISOString()
      };
      
      console.log('Cadastro completo:', allData);
      
      // Aqui você enviaria os dados para o backend
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpar dados temporários
      localStorage.removeItem('registerData');
      
      alert('Cadastro realizado com sucesso!');
      
      // Redirecionar para login
      navigate('/login');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no cadastro');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = (): void => {
    navigate('/cadastro');
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
        <span className="page-title">cadastro 2</span>
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
              name="pessoaFisica"
              placeholder="Pessoa Física *"
              value={formData.pessoaFisica}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <input
              type="text"
              name="mundo"
              placeholder="Mundo *"
              value={formData.mundo}
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
              readOnly
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
              readOnly
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
              readOnly
            />
            <span className="input-icon">🔒</span>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Finalizando...' : 'Finalizar Cadastro'}
          </button>
          
          <p className="register-note">
            Não tem problema, volta!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register2;