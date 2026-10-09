import React from 'react';

export default function Logo({ size = 40, className = "" }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.png"
        alt="Sohan Gadewar Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-110 drop-shadow-xs"
      />
    </div>
  );
}
