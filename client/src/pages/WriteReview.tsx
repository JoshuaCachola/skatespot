import React from 'react';
import { useFormik } from 'formik';
import { Header } from './components/Header';
import { ReviewStars } from 'src/utils/ReviewStars';
import { RouteComponentProps } from 'react-router';
import * as Yup from 'yup';
import { me } from 'src/graphql/reactive-variables/me';
import { useCreateReviewMutation } from 'src/generated/graphql';
import { Upload } from 'src/utils/Upload';
import { Footer } from './components/Footer';

interface Props {
  skateSpotId: number;
  location: any;
}

const validationSchema = Yup.object({
  rating: Yup.string().required('Add a star rating.'),
  review: Yup.string(),
  skateSpotId: Yup.number().required('No skate spot chosen.'),
  userId: Yup.number().required('Please log in.'),
});

export const WriteReview: React.FC<RouteComponentProps & Props> = ({ history, location }) => {
  const [createReview, { loading }] = useCreateReviewMutation();

  const formik = useFormik({
    initialValues: {
      rating: '',
      skateSpotId: location.state.skateSpot.id,
      userId: me(),
      review: '',
      imgFiles: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await createReview({ variables: values });
      resetForm();
      setSubmitting(false);
      history.goBack();
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
      <div className="border rounded border-gray-400 w-140 mx-auto my-0 h-110">
        <form onSubmit={formik.handleSubmit}>
          <ReviewStars setFieldValue={formik.setFieldValue} />
          <div className="relative overflow-hidden w-full h-full p-4">
            <textarea
              name="review"
              value={formik.values.review}
              onChange={formik.handleChange}
              rows={13}
              placeholder={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sodales velit eu orci molestie elementum. Nulla facilisi. Vestibulum blandit diam quis tortor ullamcorper condimentum. Sed sit amet volutpat nibh. Proin ac turpis vel orci semper porttitor. Integer scelerisque tristique tincidunt. Duis ac convallis justo. Vivamus lobortis ipsum id ante varius.`}
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
