import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles/index.css';
import defaultTheme from './styles/theme';

const queryClient = new QueryClient();
const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

ReactGA.initialize(trackingId as string);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense>
          <ThemeProvider theme={defaultTheme}>
            <App />
          </ThemeProvider>
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
