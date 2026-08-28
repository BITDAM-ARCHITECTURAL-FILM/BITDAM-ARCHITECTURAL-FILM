import React from 'react';
import { BRAND_INFO } from '../data/mockData';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const BitdamLogoSymbol: React.FC<{ className?: string }> = ({ className = 'h-full w-auto' }) => (
  <svg
    viewBox="0 0 100 115"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      {/* Top House Roof Azure-Cobalt Gradient */}
      <linearGradient id="bitdamBlueGrad" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor="#00A2FF" />
        <stop offset="50%" stopColor="#0066FF" />
        <stop offset="100%" stopColor="#0047D4" />
      </linearGradient>

      {/* Bottom Architectural Curve Sunset-Orange Gradient */}
      <linearGradient id="bitdamOrangeGrad" x1="0%" y1="15%" x2="100%" y2="85%">
        <stop offset="0%" stopColor="#FF7A00" />
        <stop offset="45%" stopColor="#FF8F00" />
        <stop offset="100%" stopColor="#FFB300" />
      </linearGradient>
    </defs>

    {/* Top House Roof Emblem (Blue Gradient) */}
    <path
      d="M 50 8
         L 88 34
         L 88 56
         L 76 56
         L 76 42
         L 50 24
         L 24 42
         L 24 53
         L 12 60
         L 12 34
         Z"
      fill="url(#bitdamBlueGrad)"
    />

    {/* Bottom Stylized Building / G-Loop Emblem (Orange Gradient) */}
    <path
      d="M 12 60
         L 24 53
         L 24 83
         L 52 83
         C 68 83 75 77 75 70
         C 75 64 68 62 55 62
         L 44 62
         L 44 51
         L 60 51
         C 78 51 88 60 88 70
         C 88 85 75 97 50 97
         L 12 97
         Z"
      fill="url(#bitdamOrangeGrad)"
    />
  </svg>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'h-7 sm:h-8 w-auto',
    md: 'h-8 sm:h-9 lg:h-10 w-auto',
    lg: 'h-11 sm:h-13 w-auto',
    xl: 'h-14 sm:h-18 w-auto',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg lg:text-[1.22rem]',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px] sm:text-[10px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-[11px] sm:text-xs',
    xl: 'text-xs sm:text-sm',
  };

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* Official Brand Logo Picture Emblem */}
      <div className={`relative shrink-0 ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105 flex items-center justify-center`}>
        <BitdamLogoSymbol className="h-full w-auto drop-shadow-[0_2px_8px_rgba(0,102,255,0.15)]" />
      </div>

      {/* Brand Typographic Wordmark & Architectural Specialty Subtitle */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1">
          <span
            className={`font-black tracking-tight text-white ${titleSizes[size]}`}
            style={{
              fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
              letterSpacing: '-0.035em',
            }}
          >
            빛담건물썬팅
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5">
            <span
              className={`font-bold tracking-tight text-zinc-300/90 ${subtitleSizes[size]}`}
              style={{ letterSpacing: '-0.02em' }}
            >
              건축필름시공전문
            </span>
          </div>
        )}
      </div>
    </div>
  );
};


