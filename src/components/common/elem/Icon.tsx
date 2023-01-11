import React, { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';

const Icon: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <SVGIcon viewBox='0 0 24 24'>{children}</SVGIcon>;
};

const SVGIcon = styled.svg`
  width: 1rem;
  height: 1rem;
`;

export default Icon;
