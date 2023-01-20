import React from 'react';

// type sizeType = {
//   [key: string]: number;
// };

type LogoProps = {
  size: number;
};

const Logo = ({ size }: LogoProps) => {
  return (
    <svg width={size} height={size / 2} viewBox='0 0 52 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='m51.55,24.41l-12.83-12.83s-.07-.08-.11-.12c-1.73-1.73-4.56-1.73-6.29,0l-5.75,5.75c-.64-.61-1.42-.99-2.24-1.14-1.4-.27-2.92.13-4,1.22-.12.12-.22.24-.32.36l-5.46,5.46h-5.48v-2.82h4.18c2.45,0,4.45-2,4.45-4.45s-2-4.45-4.45-4.45h-4.18v-2.49h4.18c2.45,0,4.45-2,4.45-4.45h0c0-2.45-2-4.45-4.45-4.45H4.45C2,0,0,2,0,4.45v23.1c0,2.45,2,4.45,4.45,4.45h12c1.43,0,2.7-.68,3.51-1.73l3.53-3.53,3.97,3.97c1.73,1.73,4.56,1.73,6.29,0h0c1.73-1.73,1.73-4.56,0-6.29l-.9-.9,2.61-2.61,9.8,9.8c1.73,1.73,4.56,1.73,6.29,0,1.73-1.73,1.73-4.56,0-6.29Z'
        fill='#5fcf8a'
      />
    </svg>
  );
};

export default Logo;
