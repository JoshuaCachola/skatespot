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
  // console.log(dotsArray);
  useEffect(() => {
    return () => {
      clearInterval(dotsInterval);
      // setDots([]);
    };
  }, [dotsInterval]);

  return dots;
};
