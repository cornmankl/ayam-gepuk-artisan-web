import React from 'react';

interface LogoIconProps {
    size?: number;
    className?: string;
    variant?: 'full' | 'icon' | 'text';
}

const LogoIcon: React.FC<LogoIconProps> = ({
    size = 40,
    className = '',
    variant = 'full'
}) => {
    const iconSize = size;
    const textSize = size * 0.6;

    if (variant === 'icon') {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <svg
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                >
                    {/* Background Circle */}
                    <circle cx="50" cy="50" r="48" fill="#FFD700" stroke="#1C1C1C" strokeWidth="2" />

                    {/* Chicken Body */}
                    <ellipse cx="50" cy="60" rx="25" ry="20" fill="white" stroke="#1C1C1C" strokeWidth="1" />

                    {/* Chicken Head */}
                    <circle cx="50" cy="35" r="18" fill="white" stroke="#1C1C1C" strokeWidth="1" />

                    {/* Black Head Area */}
                    <path d="M 35 25 Q 50 20 65 25 Q 65 35 50 40 Q 35 35 35 25 Z" fill="#1C1C1C" />

                    {/* Red Comb */}
                    <path d="M 45 20 Q 50 15 55 20 Q 52 25 50 23 Q 48 25 45 20 Z" fill="#E63946" />

                    {/* Red Wattle */}
                    <ellipse cx="50" cy="30" rx="3" ry="5" fill="#E63946" />

                    {/* Sunglasses */}
                    <ellipse cx="45" cy="32" rx="6" ry="4" fill="#1C1C1C" />
                    <ellipse cx="55" cy="32" rx="6" ry="4" fill="#1C1C1C" />
                    <rect x="51" y="30" width="2" height="4" fill="#1C1C1C" />

                    {/* Beak */}
                    <path d="M 50 38 Q 52 40 50 42 Q 48 40 50 38 Z" fill="#FFD700" />

                    {/* Red Bandana */}
                    <path d="M 30 45 Q 50 40 70 45 Q 70 50 50 48 Q 30 50 30 45 Z" fill="#E63946" />

                    {/* Left Arm with Pestle */}
                    <ellipse cx="35" cy="55" rx="8" ry="12" fill="white" stroke="#1C1C1C" strokeWidth="1" />
                    <rect x="25" y="45" width="4" height="20" fill="white" stroke="#1C1C1C" strokeWidth="1" rx="2" />
                    <circle cx="27" cy="40" r="3" fill="white" stroke="#1C1C1C" strokeWidth="1" />

                    {/* Right Arm with Mortar */}
                    <ellipse cx="65" cy="55" rx="8" ry="12" fill="white" stroke="#1C1C1C" strokeWidth="1" />
                    <ellipse cx="75" cy="50" rx="6" ry="8" fill="#4A4A4A" stroke="#1C1C1C" strokeWidth="1" />
                    <rect x="73" y="45" width="4" height="10" fill="#4A4A4A" stroke="#1C1C1C" strokeWidth="1" />
                </svg>
            </div>
        );
    }

    if (variant === 'text') {
        return (
            <div className={`flex flex-col items-center ${className}`}>
                <div className="text-yellow-400 font-bold text-2xl drop-shadow-lg" style={{ fontSize: textSize }}>
                    AYAM GEPUK
                </div>
                <div className="text-yellow-400 font-bold text-lg drop-shadow-lg" style={{ fontSize: textSize * 0.7 }}>
                    ARTISAN
                </div>
                <div className="text-black text-sm font-handwriting" style={{ fontSize: textSize * 0.4 }}>
                    Rasa Ayam Gepuk Sebenar!
                </div>
            </div>
        );
    }

    // Full logo variant
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Icon */}
            <div className="flex-shrink-0">
                <svg
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                >
                    {/* Background Circle */}
                    <circle cx="50" cy="50" r="48" fill="#FFD700" stroke="#1C1C1C" strokeWidth="2" />

                    {/* Chicken Body */}
                    <ellipse cx="50" cy="60" rx="25" ry="20" fill="white" stroke="#1C1C1C" strokeWidth="1" />

                    {/* Chicken Head */}
                    <circle cx="50" cy="35" r="18" fill="white" stroke="#1C1C1C" strokeWidth="1" />

                    {/* Black Head Area */}
                    <path d="M 35 25 Q 50 20 65 25 Q 65 35 50 40 Q 35 35 35 25 Z" fill="#1C1C1C" />

                    {/* Red Comb */}
                    <path d="M 45 20 Q 50 15 55 20 Q 52 25 50 23 Q 48 25 45 20 Z" fill="#E63946" />

                    {/* Red Wattle */}
                    <ellipse cx="50" cy="30" rx="3" ry="5" fill="#E63946" />

                    {/* Sunglasses */}
                    <ellipse cx="45" cy="32" rx="6" ry="4" fill="#1C1C1C" />
                    <ellipse cx="55" cy="32" rx="6" ry="4" fill="#1C1C1C" />
                    <rect x="51" y="30" width="2" height="4" fill="#1C1C1C" />

                    {/* Beak */}
                    <path d="M 50 38 Q 52 40 50 42 Q 48 40 50 38 Z" fill="#FFD700" />

                    {/* Red Bandana */}
                    <path d="M 30 45 Q 50 40 70 45 Q 70 50 50 48 Q 30 50 30 45 Z" fill="#E63946" />

                    {/* Left Arm with Pestle */}
                    <ellipse cx="35" cy="55" rx="8" ry="12" fill="white" stroke="#1C1C1C" strokeWidth="1" />
                    <rect x="25" y="45" width="4" height="20" fill="white" stroke="#1C1C1C" strokeWidth="1" rx="2" />
                    <circle cx="27" cy="40" r="3" fill="white" stroke="#1C1C1C" strokeWidth="1" />

                    {/* Right Arm with Mortar */}
                    <ellipse cx="65" cy="55" rx="8" ry="12" fill="white" stroke="#1C1C1C" strokeWidth="1" />
                    <ellipse cx="75" cy="50" rx="6" ry="8" fill="#4A4A4A" stroke="#1C1C1C" strokeWidth="1" />
                    <rect x="73" y="45" width="4" height="10" fill="#4A4A4A" stroke="#1C1C1C" strokeWidth="1" />
                </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col">
                <div className="text-yellow-400 font-bold text-2xl drop-shadow-lg" style={{ fontSize: textSize }}>
                    AYAM GEPUK
                </div>
                <div className="text-yellow-400 font-bold text-lg drop-shadow-lg" style={{ fontSize: textSize * 0.7 }}>
                    ARTISAN
                </div>
                <div className="text-black text-sm font-handwriting" style={{ fontSize: textSize * 0.4 }}>
                    Rasa Ayam Gepuk Sebenar!
                </div>
            </div>
        </div>
    );
};

export default LogoIcon;
