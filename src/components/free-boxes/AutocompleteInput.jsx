import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

const AutocompleteInput = ({
  handlePlaces,
  clearError,
  inputRef,
  setValue,
  labelTxt,
  inputId,
  inputPlaceholder,
  registerId,
  register,
  errMessage,
}) => {
  const { ref: placesRef } = usePlacesWidget({
    apiKey: 'AIzaSyBJY6Tbt9QquPzOWJ_I7vcc8E7bvHsf-rQ',
    onPlaceSelected: (place) => {
      handlePlaces(place);
    },
    options: {
      componentRestrictions: { country: ['us'] },
      fields: ['address_components'],
      types: ['address'],
    },
  });

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === 'Enter') e.preventDefault();
  };

  const handleInputChange = (e) => {
    const inputVal = e.target.value;

    setValue(registerId, inputVal);
    if (inputVal.length > 0) clearError(registerId);
  };

  return (
    <div className="relative flex w-full flex-col items-start gap-6">
      <label htmlFor={inputId}>{labelTxt}</label>
      <input
        name="address"
        id={inputId}
        className={`w-full rounded-xl border-b-2 ${
          errMessage
            ? 'border-clr-error'
            : 'border-transparent focus:border-clr-green'
        } py-4 px-8 text-sm outline outline-1 outline-clr-italic--dark`}
        placeholder={inputPlaceholder}
        onKeyDown={(e) => handleKeyDown(e)}
        ref={(e) => {
          inputRef.current = e;
          placesRef.current = e;
        }}
        onChange={(e) => handleInputChange(e)}
      />
      <input type="hidden" name="address" {...register(registerId)} />
      <p className=" absolute bottom-0 translate-y-125 text-clr-error">
        {errMessage}
      </p>
    </div>
  );
};

export default React.memo(AutocompleteInput);
