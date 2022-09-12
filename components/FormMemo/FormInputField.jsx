import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function FormInputField({
  fieldValidity, setFieldValidities, index, loading, setData,
  id, name, value, htmlFor, label, type, setSubmitError,
  placeholder, isValid, errorMessage, validationRules,
}) {
  const mounted = useRef(false);
  const validate = () => {
    let allRulesPassed = true;
    validationRules.forEach((rule) => {
      if (!rule.validate(value)) {
        setData((prev) => {
          const currentData = [...prev];
          currentData[index].isValid = false;
          currentData[index].errorMessage = rule.message;
          return currentData;
        });
        allRulesPassed = false;
      }
    });
    if (fieldValidity !== allRulesPassed) {
      setFieldValidities((prev) => {
        const newFieldValidities = [...prev];
        newFieldValidities[index] = !newFieldValidities[index];
        return newFieldValidities;
      });
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    validate();
  }, [value]);

  // eslint-disable-next-line no-console
  console.log(`rendering input ${name}`);
  return (
    <div>
      <label htmlFor={htmlFor} className="block mb-2 text-sm text-gray-600">
        {label}
      </label>
      <input
        name={name}
        id={id}
        value={value}
        type={type}
        disabled={loading}
        onChange={(e) => {
          setSubmitError('');
          setData((prev) => {
            const newArray = [...prev];
            const newData = { ...prev[index] };
            newData.value = e.target.value;
            newData.isValid = true;
            newData.errorMessage = '';
            newArray[index] = newData;
            return newArray;
          });
        }}
        placeholder={placeholder}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
      />
      {(!isValid) && <span className="text-red-600">{errorMessage}</span>}
    </div>
  );
}

// React.memo memoizes functional components. It watches the props (shallowly) and
// only re-renders the component if the props change. However, it doesn't
// watch for states in the component. This means that had we used "useState"
// , "useEffect" or "useContext" in the component, it will still re-render when
// the state or context change.
// export default FormInputField;
export default React.memo(FormInputField);

FormInputField.propTypes = {
  fieldValidity: PropTypes.bool.isRequired,
  setFieldValidities: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  validationRules: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSubmitError: PropTypes.func.isRequired,
};
