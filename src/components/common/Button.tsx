import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes
  let baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ';

  // Variant classes
  switch (variant) {
    case 'primary':
      baseClasses +=
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ';
      if (disabled || isLoading)
        baseClasses += 'bg-red-400 cursor-not-allowed ';
      break;
    case 'secondary':
      baseClasses +=
        'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 ';
      if (disabled || isLoading)
        baseClasses += 'bg-gray-100 cursor-not-allowed ';
      break;
    case 'danger':
      baseClasses +=
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ';
      if (disabled || isLoading)
        baseClasses += 'bg-red-400 cursor-not-allowed ';
      break;
    case 'outline':
      baseClasses +=
        'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 ';
      if (disabled || isLoading)
        baseClasses += 'border-gray-200 text-gray-400 cursor-not-allowed ';
      break;
  }

  // Size classes
  switch (size) {
    case 'sm':
      baseClasses += 'px-3 py-1.5 text-sm ';
      break;
    case 'md':
      baseClasses += 'px-4 py-2 text-sm ';
      break;
    case 'lg':
      baseClasses += 'px-6 py-3 text-base ';
      break;
  }

  // Loading state
  if (isLoading) {
    baseClasses += 'cursor-not-allowed ';
  }

  // Disabled state
  if (disabled) {
    baseClasses += 'cursor-not-allowed ';
  }

  return (
    <button
      className={`${baseClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};
