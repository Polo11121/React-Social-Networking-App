import { useCallback, useEffect, useRef, useState } from 'react';

export const useCheckVisibility = () => {
  const [size, setSize] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

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

  const updateDimensions = () => {
    if (ref.current) {
      setSize(ref.current.clientHeight);
    }
  };

  useEffect(() => {
    if (size) {
      window.addEventListener('scroll', listenToScroll);
    }

    return () => window.removeEventListener('scroll', listenToScroll);
  }, [listenToScroll, size]);

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    if (ref.current) {
      setSize(ref.current.clientHeight);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return { ref, isVisible, size };
};
