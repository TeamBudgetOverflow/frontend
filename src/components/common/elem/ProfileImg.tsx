import React from 'react';
import styled from 'styled-components';

interface ProfileImgProps {
  url: string;
  size: number;
}

const ProfileImg = ({ url, size }: ProfileImgProps) => {
  return <Img size={`${size}px`} src={url} />;
};

const Img = styled.img<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
`;

export default ProfileImg;
