import React from 'react';
import styled from 'styled-components';

interface IconProps {
  size: number;
  color: string;
  path: string;
}

const Icon = ({ size, color, path }: IconProps) => {
  return (
    <SVGIcon size={`${size}px`} viewBox={`0 0 ${size} ${size}`}>
      <Path color={color} d={path} fillRule='evenodd' clipRule='evenodd' />
    </SVGIcon>
  );
};

const SVGIcon = styled.svg<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const Path = styled.path<{ color: string }>`
  fill: ${(props) => {
    switch (props.color) {
      case 'primary400':
        return props.theme.primary400;
      case 'gray400':
        return props.theme.gray400;
      default:
        return props.theme.secondary900;
    }
  }};
`;

export default Icon;
