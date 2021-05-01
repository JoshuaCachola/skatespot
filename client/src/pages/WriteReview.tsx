import React from 'react';
import { useFormik } from 'formik';
import { Header } from './components/Header';
import { ReviewStars } from 'src/utils/ReviewStars';

interface Props {}

export const WriteReview: React.FC<Props> = () => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Header />
      <div className="flex mx-auto my-10 max-w-140 w-140">
        <div className="font-extrabold text-3xl">
          <span>Milpitas Skate Park</span>
        </div>
      </div>
      <div className="border rounded border-gray-400 w-140 mx-auto my-0 h-110">
        <form onSubmit={formik.handleSubmit}>
          <ReviewStars />
          <div className="relative overflow-hidden w-full h-full p-4">
            <textarea
              name="review"
              rows={13}
              placeholder={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sodales velit eu orci molestie elementum. Nulla facilisi. Vestibulum blandit diam quis tortor ullamcorper condimentum. Sed sit amet volutpat nibh. Proin ac turpis vel orci semper porttitor. Integer scelerisque tristique tincidunt. Duis ac convallis justo. Vivamus lobortis ipsum id ante varius.`}
              className="resize-none w-full h-full overflow-y-hidden focus:outline-none"
            ></textarea>
          </div>
          <div className="mt-10">
            <button className="border rounded border-red-500 bg-red-500 text-white py-2 px-8 text-lg font-semibold">
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
