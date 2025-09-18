import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginData, FormChangeEvent, FormSubmitEvent } from '../types/auth';
import '../styles/components/auth.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: FormChangeEvent): void => {
    const { name, value } = e.target;
    setFormData((prev: LoginData) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: FormSubmitEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.email || !formData.senha) {
        throw new Error('Por favor, preencha todos os campos');
      }

      console.log('Login:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (): void => {
    navigate('/cadastro');
  };

  const handleForgotPassword = (): void => {
    navigate('/recuperar-senha');
  };

  return (
    <div className="divGeral">
      <div className="divParteDeCima">
        <div className="character-section">
          <img src="./" alt="Character with shopping cart" className="character-image" />
          <p className="welcome-text">Bem vindo de volta!</p>
        </div>
      </div>
      <div className="divParteDeBaixo">
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="E-mail ou CPF"
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
              value={formData.senha}
              placeholder="Senha"
              onChange={handleChange}
              required
              disabled={loading}
            />
            <span className="input-icon">🔒</span>
          </div>
          <p className="forgot-password" onClick={handleForgotPassword}>Recuperar senha</p>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <p className="login-link">
            Não tem uma conta? <span onClick={handleRegisterClick}>Cadastre-se aqui!</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;