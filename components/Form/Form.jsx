import React, { useCallback, useMemo, useState } from 'react';
import FormSkeleton from './FormSkeleton';
import initialData from './formConfig';

export default function Form() {
  const [submitError, setSubmitError] = useState('');
  const [fieldValidities, setFieldValidities] = useState(Array(initialData.length).fill(true));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [text, setText] = useState('');

  //   useMemo is used to memoize VALUES (in contrast to useCallback which memoizes functions).
  //   Here, we can useMemo to memoize formIsValid, but there is no need to because the function
  //   is not expensive. Concretely, if we do not useMemo and type in the input box, the function
  //   will be called every time Form rerenders. If we do useMemo, the function will not be called
  //   every time.
  const formIsValid = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('form is valid?');
    return fieldValidities
      .every((fieldValidity) => fieldValidity === true);
  }, [fieldValidities]);

  //   const formIsValid = (() => {
  //     console.log('form is valid?');
  //     return fieldValidities
  //       .every((fieldValidity) => fieldValidity === true);
  //   })();

  // const formIsValid = fieldValidities
  // .every((fieldValidity) => fieldValidity === true);

  // no need to useCallback since we don't pass it as a prop
  // eslint-disable-next-line no-console
  const onSubmit = () => console.log(`Submitted form: ${data}`);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!formIsValid) {
  //       setSubmitError('Form is invalid');
  //       return;
  //     }
  //     setSubmitError('');
  //     setLoading(true);
  //     // simulate API call
  //     try {
  //       setTimeout(() => {
  //         onSubmit();
  //         setLoading(false);
  //       }, 2000);
  //     } catch (err) {
  //       setSubmitError(err);
  //     }
  //   };

  // if in this component, we have something that changes the state (like the input below)
  // the entire component will rerender. This includes the form, which has its props and
  // states the exact same as before (no need to rerender). Hence, we memoize FormSkeleton.
  // However, it still rerenders! Why? Because had we used handleSubmit, when Form rerenders
  // a NEW function called "handleSubmit" is created and passed to FormSkeleton. To prevent this,
  // we useCallback, which with the dependency array [formIsValid], only gets recreated when
  // formIsValid changes.

  const handleSubmitMemo = useCallback((e) => {
    // eslint-disable-next-line no-console
    e.preventDefault();
    if (!formIsValid) {
      setSubmitError('Form is invalid');
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
  }, [formIsValid]);

  // eslint-disable-next-line no-console
  console.log('rendering base form');
  return (
    <>
      <FormSkeleton
        handleSubmit={handleSubmitMemo}
        formIsValid={formIsValid}
        data={data}
        setData={setData}
        fieldValidities={fieldValidities}
        setFieldValidities={setFieldValidities}
        loading={loading}
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
      <div className="flex">
        <div className="mx-auto outline-blue-100 outline mt-3">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
    </>
  );
}
