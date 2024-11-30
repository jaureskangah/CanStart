// Mobile device detection
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Touch event handling
export const addTouchSupport = (element: HTMLElement) => {
  let touchStartX = 0;
  let touchStartY = 0;

  element.addEventListener('touchstart', (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  element.addEventListener('touchmove', (e: TouchEvent) => {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // Implement custom touch behavior
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      e.preventDefault();
      element.dispatchEvent(new CustomEvent('swipe', {
        detail: { direction: deltaX > 0 ? 'left' : 'right' }
      }));
    }
  });
};

// Viewport optimization
export const optimizeViewport = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    );
  }
};

// Form input optimization
export const optimizeFormInputs = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    if (input instanceof HTMLInputElement) {
      // Set appropriate input types for mobile
      switch (input.type) {
        case 'text':
          if (input.name.includes('phone')) {
            input.type = 'tel';
          } else if (input.name.includes('email')) {
            input.type = 'email';
          }
          break;
        case 'number':
          input.inputMode = 'numeric';
          break;
      }

      // Add autocomplete attributes
      if (input.name.includes('postal') || input.name.includes('zip')) {
        input.autocomplete = 'postal-code';
      } else if (input.name.includes('phone')) {
        input.autocomplete = 'tel';
      }
    }

    // Optimize focus handling
    input.addEventListener('focus', () => {
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    });
  });
};

// Offline support
export const setupOfflineSupport = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed:', error);
        });
    });
  }
};