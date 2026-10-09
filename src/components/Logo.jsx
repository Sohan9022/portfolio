import React from 'react';

export default function Logo({ size = 26, className = "" }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 ease-out group-hover:scale-105"
      >
        <defs>
          <linearGradient id="sgLogoBg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
          <linearGradient id="sgBlueGlow" x1="12" y1="12" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="sgPathGrad" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E4E4E7" />
          </linearGradient>
        </defs>

        {/* Modern Obsidian Squircle Container */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          fill="url(#sgLogoBg)"
          stroke="#27272A"
          strokeWidth="1.2"
        />

        {/* Core Glow */}
        <circle cx="16" cy="16" r="6" fill="#3B82F6" opacity="0.15" />

        {/* The Geometric S Systems Flow Path */}
        <path
          d="M21.5 10.5C21.5 8.8 19.8 7.5 17.5 7.5H13.2C10.5 7.5 8.8 9.5 8.8 12C8.8 14.5 10.5 16 13.2 16H18.8C21.5 16 23.2 17.5 23.2 20C23.2 22.5 21.5 24.5 18.8 24.5H14.5C12.2 24.5 10.5 23.2 10.5 21.5"
          stroke="url(#sgPathGrad)"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pivot / Invariant State Node */}
        <circle
          cx="16"
          cy="16"
          r="2.2"
          fill="url(#sgBlueGlow)"
        />
        <circle
          cx="16"
          cy="16"
          r="0.9"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}
