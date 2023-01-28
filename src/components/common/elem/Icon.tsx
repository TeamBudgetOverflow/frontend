import React from 'react';
import styled from 'styled-components';

interface IconProps {
  width: number;
  height: number;
  color: string;
  path: string;
}

const Icon = ({ width, height, color, path }: IconProps) => {
  return (
    <SVGIcon width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`}>
      <Path color={color} d={path} fillRule='evenodd' clipRule='evenodd' />
    </SVGIcon>
  );
};

const SVGIcon = styled.svg<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Path = styled.path<{ color: string }>`
  fill: ${(props) => {
    switch (props.color) {
      case 'primary400':
        return props.theme.primary400;
      case 'gray400':
        return props.theme.gray400;
      case 'secondary400':
        return props.theme.secondary400;
      case 'black':
        return 'black';
      case 'white':
        return 'white';
      default:
        return props.color;
    }
  }};
`;

export default Icon;
