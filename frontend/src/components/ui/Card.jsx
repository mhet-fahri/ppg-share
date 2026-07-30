import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
