import { useEffect } from 'react';
import ReactGA from 'react-ga';

const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

const RouteChangeTracker = () => {
  const pathName = window.location.pathname;
  useEffect(() => {
    getGA();
  }, [pathName]);

  const getGA = () => {
    ReactGA.initialize(trackingId as string);
    ReactGA.set({ page: pathName });
    ReactGA.pageview(pathName);
  };
};

export default RouteChangeTracker;
