import React from 'react';
import { getCLS, getFID, getLCP } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
  }
}

export function logPerformanceMetrics() {
  reportWebVitals(console.log);
}

export const withPerformanceTracking = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const WithPerformanceTracking: React.FC<P> = (props) => {
    React.useEffect(() => {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`Component ${WrappedComponent.displayName || WrappedComponent.name} rendered in ${endTime - startTime}ms`);
      };
    }, []);

    return React.createElement(WrappedComponent, props);
  };

  WithPerformanceTracking.displayName = `WithPerformanceTracking(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithPerformanceTracking;
};