import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';
import GlobalStyles from './styles/globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense>
        <App />
        <GlobalStyles />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
