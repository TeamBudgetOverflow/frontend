import React from 'react';
import styled from 'styled-components';

const BankIcons = ({ size, name }: { size: number; name: string }) => {
  switch (name) {
    case '산업은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size / 1.1}px`} src={require('../../../assets/img/bank/KDB.png')} />
        </IconWrapper>
      );
    case '기업은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/Kiup.png')} />
        </IconWrapper>
      );
    case '국민은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/KB.png')} />
        </IconWrapper>
      );
    case '수협은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${(size / 3) * 2}px`} src={require('../../../assets/img/bank/SH.png')} />
        </IconWrapper>
      );
    case '농협은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/NH.png')} />
        </IconWrapper>
      );
    case '우리은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/Woori.png')} />
        </IconWrapper>
      );
    case 'SC은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/SC.png')} />
        </IconWrapper>
      );
    case '씨티은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/Citi.png')} />
        </IconWrapper>
      );
    case '대구은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size / 1.5}px`} src={require('../../../assets/img/bank/DGB.png')} />
        </IconWrapper>
      );
    case '부산은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size / 3}px`} src={require('../../../assets/img/bank/BNK.png')} />
        </IconWrapper>
      );
    case '광주은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/GJ.png')} />
        </IconWrapper>
      );
    case '제주은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/Shinhan.png')} />
        </IconWrapper>
      );
    case '전북은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/JB.png')} />
        </IconWrapper>
      );
    case '경남은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size / 3}px`} src={require('../../../assets/img/bank/BNK.png')} />
        </IconWrapper>
      );
    case '새마을':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size / 1.1}px`} src={require('../../../assets/img/bank/SMG.png')} />
        </IconWrapper>
      );
    case '신협':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size / 1.1}px`} src={require('../../../assets/img/bank/Shinhyup.png')} />
        </IconWrapper>
      );
    case '산림조합중앙회':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/KB.png')} />
        </IconWrapper>
      );
    case '우체국':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size / 2}px`} src={require('../../../assets/img/bank/Post.png')} />
        </IconWrapper>
      );
    case '하나은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/Hana.png')} />
        </IconWrapper>
      );
    case '신한은행':
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/Shinhan.png')} />
        </IconWrapper>
      );
    default:
      return (
        <IconWrapper size={`${size}px`}>
          <Img width={`${size}px`} height={`${size}px`} src={require('../../../assets/img/bank/KB.png')} />
        </IconWrapper>
      );
  }
};

const IconWrapper = styled.div<{ size: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const Img = styled.img<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default BankIcons;
