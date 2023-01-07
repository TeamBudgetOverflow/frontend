import { CSSProperties } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

// TODO: design customizing
const sizeList = {
  large: `
    font-size: 17px;`,
  small: `
    font-size: 14px;`,
};

// TODO: font-familly 브랜드 폰트로 변경
export default styled.button<
  CSSProperties & {
    size?: 'large' | 'small';
    borderRadiusLeft?: string;
    borderRadiusRight?: string;
  }
>`
  display: ${({ display }) => display || 'inline-flex'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  align-content: ${({ alignContent }) => alignContent || 'center'};
  ${({ flexDirection }) =>
    flexDirection && `flex-direction : ${flexDirection}`};

  margin: ${({ margin }) => margin || '5px'};
  ${({ marginLeft }) => marginLeft && `margin-left : ${marginLeft}`};
  ${({ marginRight }) => marginRight && `margin-right : ${marginRight}`};
  ${({ marginTop }) => marginTop && `margin-top : ${marginTop}`};
  ${({ marginBottom }) => marginBottom && `margin-bottom : ${marginBottom}`};
  padding: ${({ padding }) => padding || '5px'};
  background: ${({ background }) => background || Colors.primary};
  color: ${({ color }) => color || 'white'};

  border: ${({ border }) => border || 'none'};
  border-color: ${({ borderColor }) => borderColor || 'black'};
  box-sizing: ${({ boxSizing }) => boxSizing};
  border-radius: ${({ borderRadius }) => borderRadius || '15px'};
  border-bottom-left-radius: ${({ borderRadiusLeft }) => borderRadiusLeft};
  border-bottom-right-radius: ${({ borderRadiusRight }) => borderRadiusRight};

  z-index: ${({ zIndex }) => zIndex};
  ${({ letterSpacing }) =>
    letterSpacing && `letter-spacing : ${letterSpacing}`};
  ${({ textAlign }) => textAlign && `text-align : ${textAlign}`};
  ${({ boxShadow }) => boxShadow && `box-shadow : ${boxShadow}`};

  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
  font-family: inherit;
  ${({ size }) => size && sizeList[size]};
  height: ${({ height }) => height || '55px'};
  line-height: ${({ lineHeight }) => lineHeight};
  width: ${({ width }) => width || '95%'};

  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  :focus {
    outline: 0;
    -webkit-appearance: none;
  }
`;
