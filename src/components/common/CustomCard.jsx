import React from 'react';

const CustomCard = ({ title, children, className = '', onClick, ...rest }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/70 shadow-card p-4 transition-shadow duration-200 ${className}`}
      {...rest}
    >
      {title && <h2 className="text-base font-semibold text-slate-900 mb-3">{title}</h2>}
      {children}
    </div>
  );
};

export default CustomCard;
