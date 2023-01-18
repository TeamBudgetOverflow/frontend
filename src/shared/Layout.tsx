import React, { FunctionComponent, PropsWithChildren, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [headerNavHeight, setHeaderNavHeight] = useState<number>(0);
  useEffect(() => {
    if (!headerRef.current || !navRef.current) return;
    if (pathname.includes('/goals/post')) return setHeaderNavHeight(headerRef.current.clientHeight);
    setHeaderNavHeight(headerRef.current.clientHeight + navRef.current.clientHeight);
  }, [headerRef.current?.clientHeight, navRef.current?.clientHeight, pathname]);
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
  overflow-y: auto;
  background-color: white;
`;

export default Layout;
