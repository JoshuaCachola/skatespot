import React from 'react';

export const ErrorBanner: React.FC = () => {
  return (
    <div className="w-8/12 h-1/6 border-gray-100 rounded border">
      <p>Sorry there was a error with your request</p>
      <p>Error: Uploading image...</p>
    </div>
  );
};
