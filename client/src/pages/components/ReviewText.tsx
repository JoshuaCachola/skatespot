import React from 'react';

interface Props {
  review: string;
}

export const ReviewText: React.FC<Props> = ({ review }) => {
  return (
    <>
      {review.split('\n').map((paragraph, idx) => {
        return (
          <div key={idx}>
            <p className="break-words whitespace-pre-line">{paragraph}</p>
            <br />
          </div>
        );
      })}
    </>
  );
};
