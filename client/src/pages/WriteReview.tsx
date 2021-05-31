import React from 'react';
import { useFormik } from 'formik';
import { Header } from './components/Header';
import { ReviewStars } from 'src/utils/ReviewStars';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';
import { useCreateReviewMutation, useGetUserQuery } from 'src/generated/graphql';
import { Upload } from 'src/utils/Upload';
import { Footer } from './components/Footer';

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
  const { data } = useGetUserQuery();
  const [createReview, { loading }] = useCreateReviewMutation({
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

  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <Header />
      <div className="flex mx-auto my-10 max-w-140 w-140">
        <div className="font-extrabold text-3xl">
          <span>{location.state.skateSpot.name}</span>
        </div>
      </div>
      <div className="border rounded border-gray-300 w-140 mx-auto h-110">
        <form onSubmit={formik.handleSubmit}>
          <ReviewStars rating={formik.values.rating} setFieldValue={formik.setFieldValue} />
          <div className="relative overflow-hidden w-full h-full p-4">
            <textarea
              name="review"
              value={formik.values.review}
              onChange={formik.handleChange}
              rows={13}
              placeholder="Write your review here..."
              className="resize-none w-full h-full overflow-y-hidden focus:outline-none"
            ></textarea>
          </div>
          <div className="my-4 font-bold text-xl">
            <h4>Add Photos</h4>
          </div>
          <section>
            <Upload values={formik.values} setFieldValue={formik.setFieldValue} />
          </section>
          <div className="mt-6">
            <button
              type="submit"
              className="border rounded border-red-500 bg-red-500 text-white py-2 px-8 text-lg font-semibold"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
