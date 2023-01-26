import React from 'react';
import ReactLoading from 'react-loading';

interface LoadingIconProps {
  size: number;
  color: string;
}

function LoadingIcon({ size, color }: LoadingIconProps) {
  return <ReactLoading type='spinningBubbles' color={color} width={size} height={size} />;
}

export default LoadingIcon;
