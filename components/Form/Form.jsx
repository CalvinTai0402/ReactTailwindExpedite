import React, { useState } from 'react';
import FormSkeleton from './FormSkeleton';
import initialData from './formConfig';

export default function Form() {
  const [submitError, setSubmitError] = useState('');
  const [fieldValidities, setFieldValidities] = useState(Array(initialData.length).fill(true));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const formIsValid = fieldValidities
    .every((fieldValidity) => fieldValidity === true);

  // eslint-disable-next-line no-console
  const onSubmit = () => console.log(`Submitted form: ${data[0].value} ${data[1].value} ${data[2].value}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      setSubmitError('Form is invalid');
      return;
    }
    if (!data.every((datum) => datum.value.length !== 0)) {
      setSubmitError('Form cannot be empty');
      return;
    }
    setSubmitError('');
    setLoading(true);
    // simulate API call
    try {
      setTimeout(() => {
        onSubmit();
        setLoading(false);
      }, 2000);
    } catch (err) {
      setSubmitError(err);
    }
  };

  return (
    <>
      <FormSkeleton
        handleSubmit={handleSubmit}
        formIsValid={formIsValid}
        data={data}
        setData={setData}
        fieldValidities={fieldValidities}
        setFieldValidities={setFieldValidities}
        loading={loading}
        setSubmitError={setSubmitError}
      />
      {submitError && (
      <div
        className="text-red-500 mt-4 flex"
      >
        <div className="text-md mx-auto">
          {submitError}
        </div>
      </div>
      )}
    </>
  );
}
