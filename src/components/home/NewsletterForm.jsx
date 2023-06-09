import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAsyncPost from '../global/useAsyncPost';
import Loading from '../global/Loading';
import OverlayMessage from '../global/OverlayMessage';
import { emailRegExp } from '../global/SchemaPatterns';

const newsletterSchema = yup.object().shape({
  newsletterEmail: yup
    .string()
    .email('Email is not valid.')
    .required('Your email is required.')
    .matches(emailRegExp, 'Email is not valid.'),
});

const NewsletterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newsletterSchema) });
  const {
    handleAsync,
    isLoading,
    error: resError,
    setError: resErrorSet,
    resMessage,
  } = useAsyncPost();

  const handleNewsletterForm = ({ newsletterEmail }) => {
    handleAsync('subscribe', {
      email: newsletterEmail,
    });
  };

  const curError = errors?.newsletterEmail?.message || resError;

  return (
    <>
      {resMessage && <OverlayMessage heading="Welcome!" message={resMessage} />}
      <form
        onSubmit={handleSubmit(handleNewsletterForm)}
        className="relative flex justify-center w-11/12 lg:w-2/4 md:w-4/6 xl:w-1/3 newsletter-form"
      >
        <input
          type="email"
          placeholder="Your email address"
          className={`shadow-card-shadow rounded-full py-3 px-5 w-full border-b ${
            curError ? 'border-clr-error' : 'focus:border-clr-blue--dark'
          }`}
          {...register('newsletterEmail', {
            required: true,
            onChange: () => {
              if (resError) resErrorSet('');
            },
          })}
        />
        <p className="absolute bottom-0 translate-y-125 text-clr-error">
          {curError}
        </p>
        <button className="group absolute text-base bg-clr-blue--dark text-white p-3 rounded-full right-0 w-1/3">
          Subscribe!
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68.906"
            height="68.985"
            viewBox="0 0 68.906 68.985"
            className="absolute right-0 w-14 -translate-y-[150%] translate-x-1/3 sm:-translate-y-[125%] sm:translate-x-full"
          >
            <g
              id="newsletter-notification"
              transform="translate(-263.978 -71.845)"
            >
              <g
                id="Group_2820"
                data-name="Group 2820"
                className="group-hover:animate-bounce"
              >
                <g id="Group_2817" data-name="Group 2817">
                  <path
                    id="Path_3294"
                    data-name="Path 3294"
                    d="M287.731,116.351l22.816-.007-3.084-3.545,0-8.489A8.314,8.314,0,0,0,299.143,96h0a8.314,8.314,0,0,0-8.311,8.316l0,8.079Z"
                    fill="#41ba03"
                  ></path>
                </g>
                <g id="Group_2818" data-name="Group 2818">
                  <path
                    id="Path_3295"
                    data-name="Path 3295"
                    d="M295.95,115.23a3.524,3.524,0,1,0,6.888-1.184"
                    fill="#41ba03"
                  ></path>
                </g>
                <g id="Group_2819" data-name="Group 2819">
                  <rect
                    id="Rectangle_688"
                    data-name="Rectangle 688"
                    width="2.238"
                    height="4.757"
                    transform="translate(298.17 92.544)"
                    fill="#41ba03"
                  ></rect>
                </g>
              </g>
              <g id="Group_2824" data-name="Group 2824">
                <g id="Group_2823" data-name="Group 2823">
                  <g id="Group_2822" data-name="Group 2822">
                    <g id="Group_2821" data-name="Group 2821">
                      <path
                        id="Path_3296"
                        data-name="Path 3296"
                        d="M332.408,100.736a4.107,4.107,0,0,1-.16-.6c-.1-.428-.229-1.012-.4-1.761a21.2,21.2,0,0,0-.811-2.813c-.2-.544-.334-1.157-.611-1.762s-.55-1.258-.849-1.944a34.541,34.541,0,0,0-6.048-8.938,33.671,33.671,0,0,0-32.416-9.487c-.757.161-1.487.451-2.241.673a15.687,15.687,0,0,0-2.232.816,31.939,31.939,0,0,0-8.461,5.064,33.6,33.6,0,0,0-11.295,18.069,32.784,32.784,0,0,0-.655,11.606,32.176,32.176,0,0,0,3.427,11.476l.58,1.088.076.144-.045.147c-1.843,6.05-3.651,11.983-5.4,17.733l-.474-.429,14.285-7.449.177-.092.161.124a33.619,33.619,0,0,0,15.041,6.533,33.4,33.4,0,0,0,26.46-7.26,34.418,34.418,0,0,0,7.518-8.8,33.311,33.311,0,0,0,4.634-16.028q.011-1.48.017-2.63-.1-1.124-.168-1.913c-.04-.492-.071-.88-.1-1.173a2.086,2.086,0,0,1-.013-.4,2.186,2.186,0,0,1,.069.393c.037.292.087.678.149,1.169q.093.792.223,1.917.015,1.155.035,2.647a36.573,36.573,0,0,1-.9,7.241,36.966,36.966,0,0,1-3.605,9,34.667,34.667,0,0,1-7.558,8.969,33.819,33.819,0,0,1-26.848,7.492,34.166,34.166,0,0,1-15.338-6.617l.338.032L264.7,140.453l-.72.377.246-.805c1.748-5.751,3.553-11.685,5.393-17.736l.032.291-.593-1.111a32.876,32.876,0,0,1-3.5-11.733,33.459,33.459,0,0,1,.68-11.861,34.194,34.194,0,0,1,11.551-18.41,32.44,32.44,0,0,1,8.629-5.13,16.017,16.017,0,0,1,2.273-.822c.767-.223,1.511-.516,2.281-.676a33.681,33.681,0,0,1,38.847,18.9l.828,1.973c.268.614.4,1.235.586,1.786a19.787,19.787,0,0,1,.751,2.846c.143.757.253,1.349.335,1.781A4.31,4.31,0,0,1,332.408,100.736Z"
                        fill="#263238"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </form>
      {isLoading && (
        <div>
          <Loading isLoading={isLoading} hasOverlay={false} />
        </div>
      )}
    </>
  );
};

export default NewsletterForm;
