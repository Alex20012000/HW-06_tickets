import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    isMobile: window.innerWidth < 768,
    isDesktop: window.innerWidth > 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        isMobile: window.innerWidth < 768,
        isDesktop: window.innerWidth > 768,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
