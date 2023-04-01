import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { nameRegExp, emailRegExp, phoneRegExp } from '../global/SchemaPatterns';
import FormInput from '../global/FormInput';
import useAsyncPost from '../global/useAsyncPost';
import Loading from '../global/Loading';
import OverlayMessage from '../global/OverlayMessage';

const aboutYouInputs = [
  [
    {
      labelTxt: 'First Name:',
      inputId: 'about-you-name',
      inputPlaceholder: 'Your Name',
      registerId: 'customerName',
    },
    {
      labelTxt: 'Last Name:',
      inputId: 'about-you-last',
      inputPlaceholder: 'Your last name',
      registerId: 'customerLastName',
    },
  ],
  [
    {
      labelTxt: 'Email Address:',
      inputId: 'about-you-email',
      inputPlaceholder: 'Your email',
      registerId: 'customerEmail',
      inputType: 'email',
    },
    {
      labelTxt: 'Phone Number:',
      inputId: 'about-you-phone',
      inputPlaceholder: 'Your phone number',
      registerId: 'customerPhone',
    },
  ],
];

const aboutYouSchema = yup.object().shape({
  customerName: yup
    .string()
    .required('Your name is required.')
    .matches(nameRegExp, 'Please use the right format.'),
  customerLastName: yup
    .string()
    .required('Your name is required.')
    .matches(nameRegExp, 'Please use the right format.'),
  customerEmail: yup
    .string()
    .email('Email is not valid.')
    .required('Your email is required.')
    .matches(emailRegExp, 'Email is not valid.'),
  customerPhone: yup
    .string()
    .required('Your phone number is required.')
    .matches(phoneRegExp, 'Phone number is not valid.'),
});

const AboutYouForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(aboutYouSchema) });

  const { isLoading, handleAsync, resMessage } = useAsyncPost(setError);

  const handleAboutYouForm = (data) => {
    handleAsync('about-you', data);
  };

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      {resMessage && (
        <OverlayMessage heading="Welcome to our Family!" message={resMessage} />
      )}
      <form
        onSubmit={handleSubmit(handleAboutYouForm)}
        className="flex flex-col gap-10 "
      >
        {aboutYouInputs.map((inputsArr, i) => (
          <React.Fragment key={i}>
            <div className={`flex grid-cols-2 flex-col gap-12 md:grid`}>
              {inputsArr.map((input) => (
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
              ))}
            </div>
            {inputsArr === aboutYouInputs[0] && (
              <p>
                <span className="font-semibold">Note*</span> If you are already
                in our system and received your quote we will automatically put
                this form filled to your file. If you are not, we will make your
                new file and will be reaching out soon.
              </p>
            )}
          </React.Fragment>
        ))}
        <div className={`flex grid-cols-2 flex-col gap-12 md:grid`}>
          <div className="relative flex w-full flex-col items-start gap-6">
            <label htmlFor="about-you-textarea">About You:</label>
            <textarea
              id="about-you-textarea"
              placeholder="Your story"
              {...register('customerStory')}
              className={`w-full rounded-xl border-b-2 ${
                errors?.customerStory
                  ? 'border-clr-error'
                  : 'border-transparent focus:border-clr-green'
              } h-44 py-4 px-8 text-sm outline outline-1 outline-clr-italic--dark`}
            />
            <p className="absolute bottom-0 translate-y-125 text-clr-error">
              {errors?.customerStory?.message}
            </p>
          </div>
        </div>
        <button className="mx-auto mt-6 w-full rounded-xl bg-clr-green py-4 font-semibold text-white sm:w-auto sm:px-32">
          SUBMIT
        </button>
      </form>
    </>
  );
};

export default AboutYouForm;
