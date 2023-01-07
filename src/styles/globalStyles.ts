/* eslint-disable */
import { createGlobalStyle } from 'styled-components';

// TODO: font-familly 추가
const GlobalStyles = createGlobalStyle<any>`
  html{
    height: 100%;
    width: 100%; 
  }
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  #root {
    height: 100%;
    width: 100%;
  }

  :root {
  --primary-900: #006523;
  --primary-800: #008537
  --primary-700: #009642;
  --primary-600: #00a94e;
  --primary-500: #00b858;
  --primary-400: #2BC470;
  --primary-300: #5FCF8A;
  --primary-200: #92DCAC;
  --primary-100: #BEEACC;
  --primary-50: #E4F7EA;
  --secondary-900: #F18529;
  --secondary-800: #F6AC39;
  --secondary-700: #F9C342;
  --secondary-600: #FCDB4B;
  --secondary-500: #FAE94C;
  --secondary-400: #FDEE68;
  --secondary-300: #FFF383;
  --secondary-200: #FEF5A4;
  --secondary-100: #FEF9C8;
  --secondary-50: #FFFDE9;
  --black: #000000;
  --grayScale-900: #252525;
  --grayScale-800: #464646;
  --grayScale-700: #666666;
  --grayScale-600: #7A7A7A;
  --grayScale-500: #A3A3A3;
  --grayScale-400: #C2C2C2;
  --grayScale-300: #E4E4E4;
  --grayScale-200: #F1F1F1;
  --grayScale-100: #F7F7F7;
  --grayScale-50: #FBFBFB;
  --white: #FFFFFF
  --minus-margin-android: 0px -16px;
  --minus-margin-ios: 0px -24px;
  --minus-margin-undefined: 0px -24px;
  --padding-android: 0px 16px;
  --padding-ios: 0px 24px;
  --padding-undefined: 0px 24px;
  }
`;

export default GlobalStyles;
