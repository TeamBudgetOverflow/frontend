import { useState, useEffect } from 'react';

export const useScroll = () => {
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );

  const [scrollY, setScrollY] = useState<number>(bodyOffset.top);
  const [scrollX, setScrollX] = useState<number>(bodyOffset.left);

  const listener = () => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollX(bodyOffset.left);
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return {
    scrollY,
    scrollX,
  };
};
