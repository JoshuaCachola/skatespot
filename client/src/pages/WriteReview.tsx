import React from 'react';
import { useFormik } from 'formik';
import { Header } from './components/Header';
import { ReviewStars } from 'src/utils/ReviewStars';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';
import { useCreateReviewMutation, useGetUserQuery } from 'src/generated/graphql';
import { Upload } from 'src/utils/Upload';
import { Footer } from './components/Footer';
import { LoadingAnimation } from './components/LoadingAnimation';
import { ErrorBanner } from './components/ErrorBanner';
import { useMediaQuery } from 'react-responsive';

interface Props {
  history: any;
  location: any;
}

const validationSchema = Yup.object({
  rating: Yup.number().required('Add a star rating.'),
  review: Yup.string(),
  skateSpotId: Yup.number().required('No skate spot chosen.'),
  userId: Yup.number().required('Please log in.'),
});

export const WriteReview: React.FC<RouteComponentProps & Props> = ({ history, location }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 415px)' });
  const { data } = useGetUserQuery();
  const [createReview, { loading, error }] = useCreateReviewMutation({
    onCompleted({ createReview }) {
      console.log(createReview);
    },
  });

  const formik = useFormik({
    initialValues: {
      rating: 0,
      skateSpotId: location.state.skateSpot.id,
      userId: 0,
      review: '',
      imgFiles: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await createReview({ variables: { ...values, userId: data!.getUser.id } });
      resetForm();
      setSubmitting(false);
      history.push(`/skate-spot/${location.state.skateSpot.name}`);
    },
  });

  return (
    <div className="overflow-y-hidden bg-gray-50">
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto">
            <LoadingAnimation />
          </div>
        </div>
      )}
      {error && <ErrorBanner />}
      <div className="h-vh10">
        <Header />
      </div>
      <section className={`h-screen mb-8 ${isMobile && 'overflow-y-scroll'}`}>
        <div className={`flex mx-auto my-10 max-w-140 ${isMobile ? 'w-72' : 'w-140'}`}>
          <div className="font-extrabold text-3xl">
            <span>{location.state.skateSpot.name}</span>
          </div>
        </div>
        <div className={`border rounded border-gray-300 mx-auto h-110 ${isMobile ? 'w-72' : 'w-140'}`}>
          <form onSubmit={formik.handleSubmit}>
            <ReviewStars rating={formik.values.rating} setFieldValue={formik.setFieldValue} />
            <div className="relative overflow-hidden w-full h-full p-4">
              <textarea
                name="review"
                value={formik.values.review}
                onChange={formik.handleChange}
                rows={13}
                placeholder="Write your review here..."
                className="resize-none w-full h-full overflow-y-hidden focus:outline-none bg-gray-50"
              ></textarea>
            </div>
            <div className="my-4 font-bold text-xl">
              <h4>Add Photos</h4>
            </div>
            <Upload values={formik.values} setFieldValue={formik.setFieldValue} />
            <div className="mt-6">
              <button
                type="submit"
                className="rounded text-white py-2 px-8 text-lg font-semibold border-blue-400 bg-blue-400 border-r-2 border-b-2 border-l border-t hover:bg-blue-200 hover:text-black"
              >
                Post Review
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};
