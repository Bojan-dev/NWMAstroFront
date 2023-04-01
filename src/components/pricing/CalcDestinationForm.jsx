import { useState, memo } from 'react';
import useFormHeight from './useFormHeight';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CalcBtn from './CalcBtn';
import { useSetFormsData } from './CalcFormsCtx';

const destinationBtns = [
  { context: <>&#60;50 Miles</>, value: '<50', id: 'calc-destination-50' },
  { context: '51-149 Miles', value: '51-149', id: 'calc-destination-100' },
  { context: <>&#62;150+ Miles</>, value: '>150', id: 'calc-destination-150' },
];

const destinationSchema = yup.object().shape({
  calcZip: yup
    .string()
    .length(5, 'Zip code must be 5 digits long.')
    .matches(/^\d+$/, 'The zip code should consist of digits only.')
    .required(),
  destinationOption: yup
    .string()
    .required('Please select a radius of the drop destination.'),
});

const CalcDestinationForm = ({
  handleNextForm,
  visibilityCl,
  setFormHeight,
  isCurrentForm,
}) => {
  const handleCalcFormsData = useSetFormsData();
  const { formRef } = useFormHeight(setFormHeight, isCurrentForm);
  const [selectedDropDestination, setSelectedDropDestination] = useState('');
  const [zipValue, setZipValue] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(destinationSchema) });

  const onDestinationSubmit = (data) => {
    handleCalcFormsData('destination', data);
    handleNextForm();
  };

  return (
    <form
      className={`flex ${visibilityCl} flex-col items-center gap-12 duration-700`}
      onSubmit={handleSubmit(onDestinationSubmit)}
      ref={formRef}
    >
      <div className="relative flex w-full flex-col items-center gap-6">
        <label htmlFor="calc-form-zip" className="text-lg">
          Pickup destination zip code:
        </label>
        <input
          id="calc-form-zip"
          {...register('calcZip', {
            onChange: (e) => {
              setZipValue(e.target.value.slice(0, 5));
            },
          })}
          type="number"
          value={zipValue}
          placeholder="Zip Code"
          className={`relative w-10/12 rounded-xl border-b-2 ${
            errors?.calcZip
              ? 'border-clr-error'
              : 'border-transparent focus:border-clr-green'
          } py-4 text-center text-sm outline outline-1 outline-clr-italic--dark sm:w-2/3 lg:w-auto lg:px-16`}
        />
        <p className="absolute bottom-0 translate-y-125 text-clr-error">
          {errors?.calcZip?.message}
        </p>
      </div>
      <div className="relative flex w-full flex-col items-center items-center gap-6">
        <p className="text-lg">Drop destination radius:</p>
        <div className="flex w-full flex-col items-center justify-center gap-10 text-white lg:flex-row">
          {destinationBtns.map((btn, i) => (
            <label
              key={btn.id}
              onClick={() => setSelectedDropDestination(btn.value)}
              htmlFor={btn.id}
              className={`w-10/12 rounded-xl ${
                selectedDropDestination
                  ? selectedDropDestination === btn.value
                    ? 'bg-clr-blue--dark'
                    : 'bg-clr-blue--disabled'
                  : 'bg-clr-blue--dark'
              } py-4 duration-200 hover:scale-105 sm:w-2/3 lg:w-auto lg:px-20`}
            >
              <input
                type="radio"
                value={btn.value}
                className="hidden"
                id={btn.id}
                {...register('destinationOption')}
              />
              {btn.context}
            </label>
          ))}
        </div>
        <p className=" absolute bottom-0 translate-y-125 text-clr-error">
          {errors?.destinationOption?.message}
        </p>
      </div>
      <CalcBtn />
    </form>
  );
};

export default memo(CalcDestinationForm, (prevProps, nextProps) => {
  return prevProps.isCurrentForm === nextProps.isCurrentForm;
});
