import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const CalcBtn = ({ isFinalForm = false }) => {
  return (
    <button
      className="relative mt-6 w-11/12 rounded-xl py-4 font-semibold duration-300 enabled:bg-clr-green enabled:text-white enabled:hover:scale-105 disabled:bg-clr-green--disabled disabled:text-clr-text sm:w-3/4 lg:w-auto lg:px-40"
      type="submit"
    >
      {isFinalForm ? (
        'SUBMIT'
      ) : (
        <>
          NEXT{' '}
          <FontAwesomeIcon
            icon={faArrowRightLong}
            className="absolute right-6 top-1/2 w-8 -translate-y-1/2"
          />
        </>
      )}
    </button>
  );
};

export default CalcBtn;
