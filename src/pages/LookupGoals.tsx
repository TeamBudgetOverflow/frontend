import React, { useRef } from 'react';
import styled from 'styled-components';

import ImpendingGoals from '../components/goal/lookup/ImpendingGoals';

import GroupGoals from '../components/goal/lookup/GroupGoals';

import RouteChangeTracker from '../shared/RouteChangeTracker';

const LookupGoals = () => {
  RouteChangeTracker();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <div ref={ref}>
        <ImpendingGoals />
      </div>
      <GroupGoals />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 20px);
  overflow: hidden;
`;

export default LookupGoals;
