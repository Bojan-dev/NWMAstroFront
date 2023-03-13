import useFormHeight from './useFormHeight';
import { useReducer, memo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CalcBtn from './CalcBtn';
import calcHouse from '../../imgs/pricing/calc-house.png';
import calcApartment from '../../imgs/pricing/calc-apartment.png';

const homeTypeBtns = [
  {
    context: 'House',
    imgUrl: calcHouse,
    id: 'calc-home-type-house',
    value: 'house',
  },
  {
    context: 'Apartment',
    imgUrl: calcApartment,
    id: 'calc-home-type-apartment',
    value: 'apartment',
  },
];

const bedroomNumbers = {
  house: ['1', '2', '3', '4+'],
  apartment: ['Studio', '1', '2+'],
};

const homeTypeSchema = yup.object().shape({
  calcHomeType: yup.string().required('Please select a home type.'),
  calcBedroomNumbers: yup
    .string()
    .required('Please select number of bedrooms.'),
});

const reducerFun = (state, action) => {
  if (action.type === 'HOME_TYPE') {
    return {
      selectedHomeType: action.payload,
      selectedBedroomsNumber: '',
    };
  }
  if (action.type === 'BEDROOMS_NUMBER') {
    return { ...state, selectedBedroomsNumber: action.payload };
  }
};

const initialState = {
  selectedHomeType: '',
  selectedBedroomsNumber: '',
};

const CalcHomeTypeForm = ({
  handleNextForm,
  visibilityCl,
  setFormHeight,
  isCurrentForm,
}) => {
  const [homeTypeState, dispatch] = useReducer(reducerFun, initialState);
  const { formRef } = useFormHeight(
    setFormHeight,
    isCurrentForm,
    homeTypeState.selectedHomeType
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(homeTypeSchema),
  });

  const onHomeTypeSubmit = (data) => {
    handleNextForm();
  };

  return (
    <form
      className={`flex ${visibilityCl} flex-col items-center gap-12 duration-700`}
      onSubmit={handleSubmit(onHomeTypeSubmit)}
      ref={formRef}
    >
      <div className="relative flex w-full flex-col items-center items-center gap-8">
        <p className="text-lg">Select type of home you are moving from:</p>
        <div className="flex w-full flex-col items-center justify-center gap-10 text-white lg:flex-row">
          {homeTypeBtns.map((btn) => (
            <label
              key={btn.id}
              htmlFor={btn.id}
              className={`flex w-10/12 cursor-pointer items-center justify-center gap-6 rounded-xl border border-dashed border-clr-italic--dark  py-2 duration-200 hover:scale-105 sm:w-5/12 lg:w-auto lg:px-16 ${
                homeTypeState.selectedHomeType
                  ? homeTypeState.selectedHomeType === btn.value
                    ? 'bg-clr-blue--dark'
                    : 'bg-clr-blue--disabled'
                  : 'bg-clr-blue--dark'
              }`}
              onClick={() => {
                dispatch({ type: 'HOME_TYPE', payload: btn.value });
                setValue('calcBedroomNumbers', '');
              }}
            >
              <input
                type="radio"
                value={btn.value}
                className="hidden"
                id={btn.id}
                {...register('calcHomeType')}
              />
              <img src={btn.imgUrl} alt="A building icon" />
              <p>{btn.context}</p>
            </label>
          ))}
          <p className=" absolute bottom-0 translate-y-125 text-clr-error">
            {errors?.calcHomeType?.message}
          </p>
        </div>
      </div>
      {homeTypeState.selectedHomeType && (
        <div className="relative flex w-full flex-col items-center items-center gap-8">
          <p className="text-lg">Number of bedrooms::</p>
          <div className="grid grid-cols-2 items-center justify-center gap-10 text-white sm:flex">
            {bedroomNumbers[homeTypeState.selectedHomeType].map((btn) => (
              <label
                key={btn}
                className={`grid h-16 w-24 place-content-center rounded-xl duration-200 hover:scale-105 ${
                  homeTypeState.selectedBedroomsNumber
                    ? homeTypeState.selectedBedroomsNumber === btn
                      ? 'bg-clr-blue--dark'
                      : 'bg-clr-blue--disabled'
                    : 'bg-clr-blue--dark'
                }`}
                onClick={() =>
                  dispatch({ type: 'BEDROOMS_NUMBER', payload: btn })
                }
              >
                <input
                  type="radio"
                  value={btn}
                  className="hidden"
                  {...register('calcBedroomNumbers')}
                />
                {btn}
              </label>
            ))}
            <p className=" absolute bottom-0 translate-y-125 text-clr-error">
              {errors?.calcBedroomNumbers?.message}
            </p>
          </div>
        </div>
      )}
      <CalcBtn />
    </form>
  );
};

export default memo(CalcHomeTypeForm, (prevProps, nextProps) => {
  return prevProps.isCurrentForm === nextProps.isCurrentForm;
});
