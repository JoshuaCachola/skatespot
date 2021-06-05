import React from 'react';

interface Props {
  review: string;
}

export const ReviewText: React.FC<Props> = ({ review }) => {
  return (
    <div className="mb-5">
      {review.split('\n').map((paragraph, idx) => {
        return (
          <div key={idx}>
            <span className="break-words whitespace-pre-line">{paragraph}</span>
            <br />
          </div>
        );
      })}
    </div>
  );
};
