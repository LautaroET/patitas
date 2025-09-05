import React from 'react';

const buttonStyles = 'font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ' +
                     // Color para el tema CLARO bg-indigo-500
                    'bg-blue-600 text-white hover:bg-blue-700 ' +
                     // Color para el tema OSCURO
                    'dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-600';

const Button = ({ children, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={buttonStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;