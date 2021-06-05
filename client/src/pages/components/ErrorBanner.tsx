import React from 'react';

interface Props {
  message: string;
}

export const ErrorBanner: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col p-4 mx-auto w-8/12 h-1/6 border-gray-300 bg-gray-100 rounded border-r-4 border-b-4 border-l border-t mt-5">
      <div className="font-bold">
        <p>Sorry there was a error with your request...</p>
        <p>Message: {message}</p>
      </div>
    </div>
  );
};
