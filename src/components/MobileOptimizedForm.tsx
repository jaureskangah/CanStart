```typescript
import React, { useEffect, useRef } from 'react';
import { optimizeFormInputs } from '../utils/mobileOptimization';

type MobileOptimizedFormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
};

export function MobileOptimizedForm({ 
  children, 
  onSubmit,
  className = '' 
}: MobileOptimizedFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      optimizeFormInputs(formRef.current);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      noValidate
    >
      {children}
    </form>
  );
}
```