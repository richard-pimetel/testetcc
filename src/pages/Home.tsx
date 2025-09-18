// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  const handleRegisterClick = (): void => {
    navigate('/cadastro');
  };

  const handleSocialLogin = (provider: 'apple' | 'google'): void => {
    console.log(`Login with ${provider}`);
    // Aqui você implementaria a lógica de login social
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-text">INFO</span>
            <span className="logo-text-hub">HUB</span>
          </div>
          <div className="cart-icon">🛒</div>
        </div>
        
        <h2 className="home-title">FAZER COMPRAS PODE SER SIMPLES</h2>
        
        <div className="action-buttons">
          <button 
            className="btn-login"
            onClick={handleLoginClick}
            type="button"
          >
            LOGIN
          </button>
          
          <button 
            className="btn-register"
            onClick={handleRegisterClick}
            type="button"
          >
            CADASTRE-SE
          </button>
        </div>
        
        <div className="social-icons">
          <div 
            className="social-icon apple"
            onClick={() => handleSocialLogin('apple')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSocialLogin('apple')}
          >
            🍎
          </div>
          <div 
            className="social-icon google"
            onClick={() => handleSocialLogin('google')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSocialLogin('google')}
          >
            G
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;