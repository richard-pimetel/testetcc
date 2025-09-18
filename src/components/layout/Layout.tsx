// src/components/layout/Layout.tsx
import React from 'react';
import { LayoutProps } from '../../types/common';

const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  footer,
  sidebar,
  className = '',
}) => {
  return (
    <div className={`layout ${className}`}>
      {header && (
        <header className="layout-header">
          {header}
        </header>
      )}
      
      <div className="layout-main">
        {sidebar && (
          <aside className="layout-sidebar">
            {sidebar}
          </aside>
        )}
        
        <main className="layout-content">
          {children}
        </main>
      </div>
      
      {footer && (
        <footer className="layout-footer">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default Layout;