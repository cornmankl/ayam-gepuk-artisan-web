import React from 'react';

interface FaviconIconProps {
  size?: number;
  className?: string;
}

const FaviconIcon: React.FC<FaviconIconProps> = ({
  size = 32,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Background Circle */}
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="#FFD700"
          stroke="#1C1C1C"
          strokeWidth="1"
        />

        {/* Chicken Body */}
        <ellipse
          cx="16"
          cy="20"
          rx="8"
          ry="6"
          fill="white"
          stroke="#1C1C1C"
          strokeWidth="0.5"
        />

        {/* Chicken Head */}
        <circle
          cx="16"
          cy="12"
          r="6"
          fill="white"
          stroke="#1C1C1C"
          strokeWidth="0.5"
        />

        {/* Black Head Area */}
        <path
          d="M 11 8 Q 16 6 21 8 Q 21 12 16 14 Q 11 12 11 8 Z"
          fill="#1C1C1C"
        />

        {/* Red Comb */}
        <path d="M 14 6 Q 16 5 18 6 Q 17 8 16 7 Q 15 8 14 6 Z" fill="#E63946" />

        {/* Red Wattle */}
        <ellipse cx="16" cy="10" rx="1" ry="2" fill="#E63946" />

        {/* Sunglasses */}
        <ellipse cx="14" cy="11" rx="2" ry="1.5" fill="#1C1C1C" />
        <ellipse cx="18" cy="11" rx="2" ry="1.5" fill="#1C1C1C" />
        <rect x="17" y="10" width="0.5" height="2" fill="#1C1C1C" />

        {/* Beak */}
        <path d="M 16 13 Q 17 14 16 15 Q 15 14 16 13 Z" fill="#FFD700" />

        {/* Red Bandana */}
        <path
          d="M 10 16 Q 16 14 22 16 Q 22 18 16 17 Q 10 18 10 16 Z"
          fill="#E63946"
        />

        {/* Left Arm with Pestle */}
        <ellipse
          cx="12"
          cy="18"
          rx="2.5"
          ry="4"
          fill="white"
          stroke="#1C1C1C"
          strokeWidth="0.5"
        />
        <rect
          x="8"
          y="14"
          width="1"
          height="8"
          fill="white"
          stroke="#1C1C1C"
          strokeWidth="0.5"
          rx="0.5"
        />
        <circle
          cx="8.5"
          cy="12"
          r="1"
          fill="white"
          stroke="#1C1C1C"
          strokeWidth="0.5"
        />

        {/* Right Arm with Mortar */}
        <ellipse
          cx="20"
          cy="18"
          rx="2.5"
          ry="4"
          fill="white"
          stroke="#1C1C1C"
          strokeWidth="0.5"
        />
        <ellipse
          cx="24"
          cy="16"
          rx="2"
          ry="2.5"
          fill="#4A4A4A"
          stroke="#1C1C1C"
          strokeWidth="0.5"
        />
        <rect
          x="23"
          y="14"
          width="1"
          height="4"
          fill="#4A4A4A"
          stroke="#1C1C1C"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
};

export default FaviconIcon;
