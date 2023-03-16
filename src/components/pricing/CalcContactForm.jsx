import { memo } from 'react';
import useFormHeight from './useFormHeight';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CalcBtn from './CalcBtn';
import { nameRegExp, phoneRegExp } from '../global/SchemaPatterns';

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
    .required('Your email is required.'),
  calcPhone: yup
    .string()
    .required('Your phone number is required.')
    .matches(phoneRegExp, 'Phone number is not valid.'),
});

const CalcContactForm = ({
  handleNextForm,
  visibilityCl,
  setFormHeight,
  isCurrentForm,
}) => {
  const { formRef } = useFormHeight(setFormHeight, isCurrentForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactSchema) });

  const onContactSubmit = (data) => {
    console.log(data);
  };

  return (
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
    </form>
  );
};

export default memo(CalcContactForm, (prevProps, nextProps) => {
  return prevProps.isCurrentForm === nextProps.isCurrentForm;
});
