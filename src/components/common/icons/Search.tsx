import React from 'react';

type SearchProps = {
  width?: number;
  height?: number;
  [key: string]: unknown;
};

export const Search = ({ width = 16, height = 16, ...props }: SearchProps) => {
  return (
    <svg
      className='gUZ ztu U9O kVc'
      height={height}
      width={width}
      viewBox='0 0 24 24'
      aria-label='검색 아이콘'
      role='img'
      {...props}>
      <path d='M10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6m13.12 2.88-4.26-4.26A9.842 9.842 0 0 0 20 10c0-5.52-4.48-10-10-10S0 4.48 0 10s4.48 10 10 10c1.67 0 3.24-.41 4.62-1.14l4.26 4.26a3 3 0 0 0 4.24 0 3 3 0 0 0 0-4.24'></path>
    </svg>
  );
};
