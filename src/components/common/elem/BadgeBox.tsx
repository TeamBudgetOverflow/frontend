import React, { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';

const BadgeBox: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <Badge>{children}</Badge>;
};

const Badge = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.gray300};
`;

export default BadgeBox;
