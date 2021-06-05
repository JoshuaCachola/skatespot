import React from 'react';
import { useLoadingText } from 'src/utils/useLoadingText';

export const LoadingText: React.FC = () => {
  const dots = useLoadingText();
  return (
    <>
      <h2>Loading</h2>
      {dots.map((dot, idx) => {
        return <span key={idx}>{dot}</span>;
      })}
    </>
  );
};
