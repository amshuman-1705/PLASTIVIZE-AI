import React from 'react';

export const Logo: React.FC<{
  className?: string;
  waveColor1?: string;
  waveColor2?: string;
  textColor?: string;
}> = ({
  className,
  waveColor1 = '#10B981',
  waveColor2 = '#34D399',
  textColor = '#059669',
}) => (
  <svg
    className={className}
    viewBox="0 0 250 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 25 C15 10, 25 10, 30 25 S45 40, 50 25"
      stroke={waveColor1}
      fill="transparent"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M40 25 C45 10, 55 10, 60 25 S75 40, 80 25"
      stroke={waveColor2}
      fill="transparent"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <text
      x="90"
      y="35"
      fontFamily="sans-serif"
      fontSize="28"
      fontWeight="bold"
      fill={textColor}
      letterSpacing="2"
    >
      PLASTIVIZE
    </text>
  </svg>
);