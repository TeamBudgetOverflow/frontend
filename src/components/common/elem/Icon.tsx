import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IconProps {
  children?: React.ReactNode;
  onClickHandler?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const Icon: FunctionComponent<IconProps> = ({ children, onClickHandler }) => {
  return (
    <SVGIcon viewBox='0 0 24 24' onClick={onClickHandler}>
      {children}
    </SVGIcon>
  );
};

const SVGIcon = styled.svg`
  width: 1rem;
  height: 1rem;
`;

export default Icon;
