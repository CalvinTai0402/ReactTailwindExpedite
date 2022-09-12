import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

function FormSubmitButton({ loading }) {
  // eslint-disable-next-line no-console
  console.log('rendering button');
  return (
    <div className="mt-10">
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      >
        {loading ? <Spinner size={6} /> : 'Login'}
      </button>
    </div>
  );
}

// export default FormSubmitButton;
export default React.memo(FormSubmitButton);

FormSubmitButton.propTypes = {
  // formIsValid: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
