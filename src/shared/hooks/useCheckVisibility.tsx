import { useCallback, useEffect, useState } from 'react';

export const useCheckVisibility = () => {
  const [size, setSize] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setSize(node.getBoundingClientRect().height);
    }
  }, []);

  const listenToScroll = useCallback(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (size && winScroll > size) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [isVisible, size]);

  useEffect(() => {
    if (size) {
      window.addEventListener('scroll', listenToScroll);
    }

    return () => window.removeEventListener('scroll', listenToScroll);
  }, [listenToScroll, size]);

  return { ref, isVisible, size };
};
