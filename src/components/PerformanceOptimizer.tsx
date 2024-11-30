import React, { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer';

// Lazy load components
export const lazyLoad = (importFn: () => Promise<any>) => {
  const LazyComponent = lazy(importFn);
  return function LazyWrapper(props: any) {
    return (
      <Suspense fallback={<LoadingPlaceholder />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

// Loading placeholder
export function LoadingPlaceholder() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

// Intersection Observer Hook for lazy loading
export function useInViewLoader() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return { ref, inView };
}

// Virtual List Component
export function VirtualList<T>({ 
  items, 
  height, 
  rowHeight, 
  renderItem 
}: { 
  items: T[];
  height: number;
  rowHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 10 });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const start = Math.floor(scrollTop / rowHeight);
    const end = Math.min(start + Math.ceil(height / rowHeight), items.length);
    setVisibleRange({ start, end });
  };

  return (
    <div
      style={{ height, overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * rowHeight, position: 'relative' }}>
        {items.slice(visibleRange.start, visibleRange.end).map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: (visibleRange.start + index) * rowHeight,
              height: rowHeight,
              width: '100%'
            }}
          >
            {renderItem(item, visibleRange.start + index)}
          </div>
        ))}
      </div>
    </div>
  );
}