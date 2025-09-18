// src/components/common/Input.tsx
import React from 'react';
import { InputProps } from '../../types/common';

const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className = '',
  maxLength,
  minLength,
  icon,
  ...props
}) => {
  const inputClasses = [
    'input',
    disabled && 'input-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        maxLength={maxLength}
        minLength={minLength}
        {...props}
      />
      {icon && (
        <span className="input-icon">{icon}</span>
      )}
    </div>
  );
};

export default Input;