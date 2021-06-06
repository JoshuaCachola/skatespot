import React, { useEffect } from 'react';

// const loadingDots = (dots: Array<string>, setDots: (dots) => void) => {};

export const useLoadingText = () => {
  const [dots, setDots] = React.useState<Array<string>>([]);
  const dotsInterval = setInterval(() => {
    if (dots.length < 3) {
      setDots([...dots, '.']);
    } else {
      setDots([]);
    }
  }, 1000);
  useEffect(() => {
    return () => {
      clearInterval(dotsInterval);
    };
  }, [dotsInterval]);

  return dots;
};
