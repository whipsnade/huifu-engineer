import { useRef, useCallback } from 'react';

export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>() {
  const cleanupRef = useRef<(() => void) | null>(null);
  
  const setRef = useCallback((node: T | null) => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    
    if (node) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        const maxScrollLeft = node.scrollWidth - node.clientWidth;
        if (maxScrollLeft > 0) {
          e.preventDefault();
          node.scrollTo({
            left: node.scrollLeft + e.deltaY,
            behavior: 'smooth'
          });
        }
      };
      
      node.addEventListener('wheel', onWheel, { passive: false });
      cleanupRef.current = () => node.removeEventListener('wheel', onWheel);
    }
  }, []);
  
  return setRef;
}
