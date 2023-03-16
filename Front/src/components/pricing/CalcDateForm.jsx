import { memo } from 'react';
import useFormHeight from './useFormHeight';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CalcBtn from './CalcBtn';
import '../../styles/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';

const oneYearInFront = new Date().setFullYear(new Date().getFullYear() + 1);
const tomorrow = new Date().setDate(new Date().getDate() + 1);

const dateSchema = yup.object().shape({
  calcDate: yup
    .date()
    .min(
      new Date(tomorrow).toDateString(),
      'The earlier date for a move is tomorrow.'
    )
    .max(
      new Date(oneYearInFront).toDateString(),
      'The latest date for the move is one year from today.'
    )
    .required('Please select a move date.'),
});

const CalcDateForm = ({
  handleNextForm,
  visibilityCl,
  setFormHeight,
  isCurrentForm,
}) => {
  const { formRef } = useFormHeight(setFormHeight, isCurrentForm);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(dateSchema) });

  const onDateSubmit = (data) => {
    handleNextForm();
  };

  return (
    <form
      className={`flex ${visibilityCl} flex-col items-center gap-12 duration-700`}
      onSubmit={handleSubmit(onDateSubmit)}
      ref={formRef}
    >
      <div className="relative flex w-full flex-col items-center gap-6">
        <label htmlFor="date" className="text-lg">
          Select a move date:
        </label>
        <Controller
          control={control}
          name="calcDate"
          render={({ field }) => (
            <Flatpickr
              options={{
                altInput: true,
                altFormat: 'm/d/Y',
                dateFormat: 'm/d/y',
                minDate: new Date().getTime(),
                maxDate: oneYearInFront,
                inline: true,
                allowInput: true,
              }}
              value={field.value}
              onChange={(date) => field.onChange(date[0])}
              id="date"
              name="date"
              placeholder="Format: m/d/y"
              className="relative w-10/12 rounded-xl border-b-2 border-transparent py-4 text-center text-sm outline outline-1 outline-clr-italic--dark focus:border-clr-green sm:w-2/3 md:w-auto md:px-24"
            />
          )}
        />
        <p className="absolute bottom-0 translate-y-125 text-clr-error">
          {errors?.calcDate?.message}
        </p>
      </div>
      <CalcBtn />
    </form>
  );
};

export default memo(CalcDateForm, (prevProps, nextProps) => {
  return prevProps.isCurrentForm === nextProps.isCurrentForm;
});
