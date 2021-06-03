import React from 'react';

export const ErrorBanner: React.FC = () => {
  return (
    <div className="flex flex-col p-4 mx-auto w-8/12 h-1/6 border-gray-300 bg-gray-100 rounded border-r-4 border-b-4 border-l border-t mt-5">
      <div className="font-bold">
        <p>Sorry there was a error with your request...</p>
        <p>Error: Uploading image...</p>
      </div>
    </div>
  );
};
