import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../global/FormInput';
import { nameRegExp } from '../global/SchemaPatterns';

const contactInputs = [
  {
    labelTxt: 'Your full name:',
    inputId: 'contact-full-name',
    inputPlaceholder: 'Your full name here',
    registerId: 'contactFullName',
  },
  {
    labelTxt: 'Your email address:',
    inputId: 'contact-email',
    inputPlaceholder: 'Your email here',
    registerId: 'contactEmail',
    inputType: 'email',
  },
];

const contactSchema = yup.object().shape({
  contactFullName: yup
    .string()
    .required('Your name is required.')
    .matches(nameRegExp, 'Please use the right format.'),
  contactEmail: yup
    .string()
    .email('Email is not valid.')
    .required('Your email is required.'),
  contactMessage: yup.string().required('Please fill out your message.'),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactSchema) });

  const handleContactForm = (data) => {
    console.log(data);
  };

  return (
    <div className="rounded-b-3xl border border-clr-italic p-12 shadow-process-shadow lg:rounded-l-none lg:rounded-r-3xl">
      <form
        onSubmit={handleSubmit(handleContactForm)}
        className="flex h-full flex-col justify-center gap-12 "
      >
        {contactInputs.map((input) => (
          <FormInput
            key={input.inputId}
            labelTxt={input.labelTxt}
            inputId={input.inputId}
            inputPlaceholder={input.inputPlaceholder}
            inputType={input.inputType}
            registerId={input.registerId}
            register={register}
            errMessage={errors[input.registerId]?.message}
          />
        ))}
        <div className="relative flex w-full flex-col items-start gap-6">
          <label htmlFor="contact-message">Your message:</label>
          <textarea
            id="contact-message"
            placeholder="Your message here"
            {...register('contactMessage')}
            className={`w-full rounded-xl border-b-2 ${
              errors?.contactMessage
                ? 'border-clr-error'
                : 'border-transparent focus:border-clr-green'
            } h-44 max-h-44 py-4 px-8 text-sm outline outline-1 outline-clr-italic--dark `}
          />
          <p className="absolute bottom-0 translate-y-125 text-clr-error">
            {errors?.contactMessage?.message}
          </p>
        </div>
        <button className="mx-auto mt-6 w-full rounded-xl bg-clr-green py-4 font-semibold text-white sm:w-auto sm:px-20">
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
