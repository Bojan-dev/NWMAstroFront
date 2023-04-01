import { memo, useEffect } from 'react';
import useFormHeight from './useFormHeight';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CalcBtn from './CalcBtn';
import { nameRegExp, emailRegExp, phoneRegExp } from '../global/SchemaPatterns';
import { useGetFormsInfo } from './CalcFormsCtx';
import useAsyncPost from '../global/useAsyncPost';
import Loading from '../global/Loading';
import OverlayMessage from '../global/OverlayMessage';

const contactInputs = [
  {
    label: 'Full Name',
    id: 'calc-full-name',
    placeholder: 'Your full name',
    registedId: 'calcName',
  },
  {
    label: 'Email Address',
    id: 'calc-email-address',
    placeholder: 'Your email address',
    registedId: 'calcEmail',
    type: 'email',
  },
  {
    label: 'Phone Number',
    id: 'calc-phone-number',
    placeholder: 'Your phone number | +1',
    registedId: 'calcPhone',
    type: 'tel',
  },
];

const contactSchema = yup.object().shape({
  calcName: yup
    .string()
    .required('Your name is required.')
    .matches(nameRegExp, 'Please use the right format.'),
  calcEmail: yup
    .string()
    .email('Email is not valid.')
    .required('Your email is required.')
    .matches(emailRegExp, 'Email is not valid.'),
  calcPhone: yup
    .string()
    .required('Your phone number is required.')
    .matches(phoneRegExp, 'Phone number is not valid.'),
});

const CalcContactForm = ({ visibilityCl, setFormHeight, isCurrentForm }) => {
  const { calcForms: calcFormsData } = useGetFormsInfo();
  const {
    handleAsync,
    isLoading,
    error: resErrors,
    resMessage,
  } = useAsyncPost();
  const { formRef } = useFormHeight(setFormHeight, isCurrentForm, resErrors);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactSchema) });

  const onContactSubmit = (data) => {
    handleAsync('pricing', {
      formsData: { ...calcFormsData, contactData: data },
    });
  };

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      {resMessage && (
        <OverlayMessage
          heading="Quote Request Received!"
          message={resMessage}
        />
      )}
      <form
        className={`flex ${visibilityCl} flex-col items-center gap-12 duration-700`}
        onSubmit={handleSubmit(onContactSubmit)}
        ref={formRef}
      >
        {contactInputs.map((input) => (
          <div
            key={input.registedId}
            className="relative flex w-full flex-col items-center gap-6"
          >
            <label htmlFor={input.id} className="text-lg">
              {input.label}
            </label>
            <input
              id={input.id}
              {...register(input.registedId)}
              type={input.type || 'text'}
              placeholder={input.placeholder}
              className={`relative w-10/12 rounded-xl border-b-2  ${
                errors[input.registedId]
                  ? 'border-clr-error'
                  : 'border-transparent focus:border-clr-green'
              } py-4 text-center text-sm outline outline-1 outline-clr-italic--dark sm:w-2/3 lg:w-auto lg:px-16`}
            />
            <p className="absolute bottom-0 translate-y-125 text-clr-error">
              {errors[input.registedId]?.message}
            </p>
          </div>
        ))}
        <CalcBtn isFinalForm={true} />
        {resErrors && (
          <div className="flex flex-col items-center gap-4">
            <p className="mb-2">
              Please fix the following errors then submit the form again:
            </p>
            {resErrors.map((err, i) => (
              <p key={i} className="text-clr-error">
                {err}
              </p>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default memo(CalcContactForm, (prevProps, nextProps) => {
  return prevProps.isCurrentForm === nextProps.isCurrentForm;
});
