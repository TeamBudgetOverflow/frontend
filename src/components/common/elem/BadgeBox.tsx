import React from 'react';
import styled from 'styled-components';

const BadgeBox = ({ imgURL }: { imgURL: string }) => {
  return <Badge src={imgURL}></Badge>;
};

const Badge = styled.img`
  width: 100px;
  height: 100px;
`;

export default BadgeBox;
