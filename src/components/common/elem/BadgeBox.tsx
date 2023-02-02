import React from 'react';
import styled from 'styled-components';

const BadgeBox = ({ imgURL }: { imgURL: string }) => {
  return <Badge src={imgURL}></Badge>;
};

const Badge = styled.img`
  width: 100%;
  max-width: 100px;
  max-height: 100px;
  aspect-ratio: 1;
`;

export default BadgeBox;
