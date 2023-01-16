import React, { FunctionComponent, PropsWithChildren, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [headerNavHeight, setHeaderNavHeight] = useState<number>(0);
  useEffect(() => {
    if (!headerRef.current || !navRef.current) return;
    setHeaderNavHeight(headerRef.current.clientHeight + navRef.current.clientHeight);
  }, [headerRef.current, navRef.current]);
  return (
    <>
      <Header props='' ref={headerRef} />
      <Body height={`${headerNavHeight}px`}>{children}</Body>
      <Navigation props='' ref={navRef} />
    </>
  );
};

const Body = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.height})`};
  background-color: ${(props) => props.theme.gray100};
`;

export default Layout;
