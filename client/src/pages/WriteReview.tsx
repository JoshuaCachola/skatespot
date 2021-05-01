import React from 'react';
import { useFormik } from 'formik';
import { Header } from './components/Header';
import { ReviewStars } from 'src/utils/ReviewStars';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';
import { me } from 'src/graphql/reactive-variables/me';
// import { useCreateReviewMutation } from 'src/generated/graphql';

interface Props {
  skateSpotId: number;
}

// type ratingTypes = 'oneStar' | 'twoStar' | 'threeStar' | 'fourStar' | 'fiveStar' | null;

const validationSchema = Yup.object({
  rating: Yup.string().required('Rating required.'),
});

export const WriteReview: React.FC<RouteComponentProps & Props> = ({ skateSpotId, history }) => {
  // const [rating, setRating] = useState<ratingTypes>(null);
  // const [createReview] = useCreateReviewMutation();

  const formik = useFormik({
    initialValues: {
      rating: 'fiveStar',
      skateSpotId,
      userId: me(),
      review: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      alert('hello');
      resetForm();
      setSubmitting(false);
      history.push('/');
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
