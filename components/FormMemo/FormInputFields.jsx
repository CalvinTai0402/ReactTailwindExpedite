import React from 'react';
import FormInputField from './FormInputField';

function FormInputFields({
  data, setData, fieldValidities, setFieldValidities, loading, setSubmitError,
}) {
  return (
    Object.values(data).map((initialData, index) => {
      const {
        id, name, value, htmlFor, label, type,
        placeholder, isValid, errorMessage, validationRules,
      } = initialData;
      return (
        <div key={initialData.id} className="mb-2">
          <FormInputField
            initialData={initialData}
            id={id}
            name={name}
            label={label}
            type={type}
            placeholder={placeholder}
            isValid={isValid}
            errorMessage={errorMessage}
            validationRules={validationRules}
            value={value}
            htmlFor={htmlFor}
            index={index}
            loading={loading}
            fieldValidity={fieldValidities[index]}
            setFieldValidities={setFieldValidities}
            setData={setData}
            setSubmitError={setSubmitError}
          />
        </div>
      );
    })
  );
}

// export default FormInputFields;
export default React.memo(FormInputFields);
