// src/components/common/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleBackClick = (): void => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={`auth-header ${className}`}>
      {showBackButton && (
        <button 
          className="back-btn" 
          onClick={handleBackClick}
          type="button"
          aria-label="Voltar"
        >
          ←
        </button>
      )}
      {title && <span className="page-title">{title}</span>}
    </header>
  );
};

export default Header;