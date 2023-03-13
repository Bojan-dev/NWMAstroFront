import Autocomplete from 'react-google-autocomplete';

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
  return (
    <label className="relative flex w-full flex-col gap-6" htmlFor={inputId}>
      {labelTxt}
      <Autocomplete
        apiKey={'AIzaSyBJY6Tbt9QquPzOWJ_I7vcc8E7bvHsf-rQ'}
        options={{
          componentRestrictions: { country: ['us'] },
          fields: ['address_components'],
          types: ['address'],
        }}
        onPlaceSelected={handlePlaces()}
        onKeyDown={(e) => {
          const key = e.key;
          if (key === 'Enter') e.preventDefault();
        }}
        id={inputId}
        className={`w-full rounded-xl border-b-2 ${
          errMessage
            ? 'border-clr-error'
            : 'border-transparent focus:border-clr-green'
        } py-4 px-8 text-sm outline outline-1 outline-clr-italic--dark`}
        placeholder={inputPlaceholder}
        ref={inputRef}
        onChange={(e) => {
          const inputVal = e.target.value;

          setValue(registerId, inputVal);
          if (inputVal.length > 0) clearError(registerId);
        }}
      />
      <input type="hidden" name="address" {...register(registerId)} />
      <p className=" absolute bottom-0 translate-y-125 text-clr-error">
        {errMessage}
      </p>
    </label>
  );
};

export default AutocompleteInput;
