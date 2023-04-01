import React, { useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { nameRegExp, emailRegExp, phoneRegExp } from '../global/SchemaPatterns';
import FormInput from '../global/FormInput';
import AutocompleteInput from './AutocompleteInput';
import getAddressInputValue from './getAddressInputValue';
import useAsyncPost from '../global/useAsyncPost';
import Loading from '../global/Loading';
import OverlayMessage from '../global/OverlayMessage';

const boxesInputs = [
  [
    {
      labelTxt: 'First Name:',
      inputId: 'free-boxes-name',
      inputPlaceholder: 'Your Name',
      registerId: 'boxesName',
    },
    {
      labelTxt: 'Last Name:',
      inputId: 'free-boxes-last',
      inputPlaceholder: 'Your last name',
      registerId: 'boxesLastName',
    },
  ],
  [
    {
      labelTxt: 'Address:',
      inputId: 'free-boxes-address',
      inputPlaceholder: 'Shipping address',
      registerId: 'boxesAddress',
      isAddress: true,
    },
    {
      labelTxt: 'Apt. or suite:',
      inputId: 'free-boxes-apt',
      inputPlaceholder: 'Appartment/suite number',
      registerId: 'boxesApartment',
      isAddress: true,
    },
  ],
  [
    {
      labelTxt: 'City:',
      inputId: 'free-boxes-city',
      inputPlaceholder: 'Shipping city',
      registerId: 'boxesCity',
      isAddress: true,
    },
    {
      labelTxt: 'State/Province:',
      inputId: 'free-boxes-state',
      inputPlaceholder: 'Shipping State',
      registerId: 'boxesState',
      isAddress: true,
    },

    {
      labelTxt: 'Zip/Postal:',
      inputId: 'free-boxes-zip',
      inputPlaceholder: 'Zip number',
      registerId: 'boxesZip',
      isAddress: true,
    },
  ],
  [
    {
      labelTxt: 'Email Address:',
      inputId: 'free-boxes-email',
      inputPlaceholder: 'Your email',
      registerId: 'boxesEmail',
      inputType: 'email',
    },
    {
      labelTxt: 'Phone Number:',
      inputId: 'free-boxes-phone',
      inputPlaceholder: 'Your phone number',
      registerId: 'boxesPhone',
    },
  ],
];

const freeBoxesSchema = yup.object().shape({
  boxesName: yup
    .string()
    .required('Your name is required.')
    .matches(nameRegExp, 'Please use the right format.'),
  boxesLastName: yup
    .string()
    .required('Your last name is required.')
    .matches(nameRegExp, 'Please use the right format.'),
  boxesAddress: yup.string().required('Shipping address is required.'),
  boxesApartment: yup.string(),
  boxesCity: yup.string().required('City is required.'),
  boxesState: yup.string().required('State is required.'),
  boxesZip: yup
    .string()
    .length(5, 'Zip code must be 5 digits long.')
    .matches(/^\d+$/, 'The zip code should consist of digits only.')
    .required(),
  boxesEmail: yup
    .string()
    .email('Email is not valid.')
    .required('Your email is required.')
    .matches(emailRegExp, 'Email is not valid.'),
  boxesPhone: yup
    .string()
    .required('Your phone number is required.')
    .matches(phoneRegExp, 'Phone number is not valid.'),
});

const BoxesForm = () => {
  const addressRef = useRef(null);
  const aptRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);

  const addressRefsArr = useRef([
    { id: 'free-boxes-address', ref: addressRef },
    { id: 'free-boxes-apt', ref: aptRef },
    { id: 'free-boxes-city', ref: cityRef },
    { id: 'free-boxes-state', ref: stateRef },
    { id: 'free-boxes-zip', ref: zipRef },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm({ resolver: yupResolver(freeBoxesSchema) });

  const { isLoading, handleAsync, resMessage } = useAsyncPost(setError);

  const onBoxesSubmit = (data) => {
    handleAsync('free-boxes', data);
  };

  const handleSelectedPlace = useCallback((place) => {
    const addressComponents = place.address_components;

    addressRefsArr.current.forEach((refInfo) =>
      getAddressInputValue(
        refInfo.id,
        refInfo.ref,
        addressComponents,
        clearErrors,
        setValue
      )
    );
  }, []);

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      {resMessage && (
        <OverlayMessage heading="Expect Our Call!" message={resMessage} />
      )}
      <form
        onSubmit={handleSubmit(onBoxesSubmit)}
        className="flex flex-col gap-10 border-t pt-10"
      >
        <h2 className="relative font-semibold before:absolute before:bottom-0 before:h-0.5 before:w-12 before:rounded-xl before:bg-clr-green">
          SHIPPING INFORMATION:
        </h2>
        {boxesInputs.map((inputsArr, i) => {
          const isLastArr = inputsArr === boxesInputs.at(-1);
          return (
            <React.Fragment key={i}>
              {isLastArr && (
                <h2 className="relative mt-4 font-semibold before:absolute before:bottom-0 before:h-0.5 before:w-12 before:rounded-xl before:bg-clr-green">
                  CONTACT INFORMATION:
                </h2>
              )}
              <div
                className={`flex ${`grid-cols-${inputsArr.length}`} flex-col gap-12 md:grid`}
              >
                {inputsArr.map((input) => {
                  const isInputAddress = input.isAddress;
                  const ref = isInputAddress
                    ? addressRefsArr.current.find(
                        (ref) => ref.id === input.inputId
                      ).ref
                    : null;

                  return !isInputAddress ? (
                    <FormInput
                      key={input.inputId}
                      labelTxt={input.labelTxt}
                      inputId={input.inputId}
                      inputPlaceholder={input.inputPlaceholder}
                      inputType={input?.inputType}
                      registerId={input.registerId}
                      register={register}
                      errMessage={errors[input.registerId]?.message}
                    />
                  ) : (
                    <AutocompleteInput
                      key={input.inputId}
                      setValue={setValue}
                      clearError={clearErrors}
                      inputRef={ref}
                      handlePlaces={handleSelectedPlace}
                      labelTxt={input.labelTxt}
                      inputId={input.inputId}
                      inputPlaceholder={input.inputPlaceholder}
                      registerId={input.registerId}
                      register={register}
                      errMessage={errors[input.registerId]?.message}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
        <button className="mx-auto mt-6 w-full rounded-xl bg-clr-green py-6 font-semibold text-white sm:w-auto sm:px-20">
          PROCESS REQUEST
        </button>
      </form>
    </>
  );
};

export default BoxesForm;
