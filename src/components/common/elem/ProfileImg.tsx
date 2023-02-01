import React from 'react';
import styled from 'styled-components';
import LoadingIcon from './LoadingIcon';

interface ProfileImgProps {
  url: string;
  size: number;
  isLoading?: boolean;
  borderColor?: string;
}

const ProfileImg = ({ url, size, isLoading, borderColor }: ProfileImgProps) => {
  return (
    <>
      {isLoading ? (
        <LoadingImg size={`${size}px`}>
          <LoadingIcon size={size - 30} color='white' />
        </LoadingImg>
      ) : (
        <Img
          size={`${size}px`}
          borderColor={borderColor}
          src={!url ? require('../../../assets/img/default.png') : url}
        />
      )}
    </>
  );
};

const LoadingImg = styled.div<{ size: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: ${(props) => props.theme.gray300};
`;

const Img = styled.img<{ size: string; borderColor?: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  border: ${(props) => (props.borderColor ? `1px solid ${props.borderColor}` : `1px solid ${props.theme.gray500}`)};
`;

export default ProfileImg;
