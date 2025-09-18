// src/components/common/Footer.tsx
import React from 'react';

interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ 
  className = '',
  children 
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`app-footer ${className}`}>
      {children || (
        <div className="footer-content">
          <p>&copy; {currentYear} InfoHub. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#privacy" className="footer-link">
              Política de Privacidade
            </a>
            <a href="#terms" className="footer-link">
              Termos de Uso
            </a>
            <a href="#support" className="footer-link">
              Suporte
            </a>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;