const FormInput = ({
  labelTxt,
  inputId,
  inputPlaceholder,
  inputType = 'text',
  registerId,
  register,
  errMessage,
}) => {
  return (
    <div className="relative flex w-full flex-col items-start gap-6">
      <label htmlFor={inputId}>{labelTxt}</label>
      <input
        type={inputType}
        id={inputId}
        placeholder={inputPlaceholder}
        {...register(registerId)}
        className={`w-full rounded-xl border-b-2 ${
          errMessage
            ? 'border-clr-error'
            : 'border-transparent focus:border-clr-green'
        } py-4 px-8 text-sm outline outline-1 outline-clr-italic--dark`}
      />
      <p className=" absolute bottom-0 translate-y-125 text-clr-error">
        {errMessage}
      </p>
    </div>
  );
};

export default FormInput;
