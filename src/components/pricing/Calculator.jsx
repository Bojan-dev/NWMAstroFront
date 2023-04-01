import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import CalcDestinationForm from './CalcDestinationForm';
import CalcDateForm from './CalcDateForm';
import CalcHomeTypeForm from './CalcHomeTypeForm';
import CalcContactForm from './CalcContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faLocationDot,
  faCalendarDays,
  faCity,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import CalcFormsProvider from './CalcFormsCtx';

const FormElFun =
  (FormEl) =>
  ({ handleNextForm, visibilityCl, setFormHeight, isCurrentForm }) =>
    (
      <FormEl
        handleNextForm={handleNextForm}
        visibilityCl={visibilityCl}
        setFormHeight={setFormHeight}
        isCurrentForm={isCurrentForm}
      />
    );

const calcSteps = [
  {
    title: 'Moving Destination',
    form: FormElFun(CalcDestinationForm),
    icon: faLocationDot,
    param: 'destination',
  },
  {
    title: 'Move Date',
    form: FormElFun(CalcDateForm),
    icon: faCalendarDays,
    param: 'date',
  },
  {
    title: 'Home Type',
    form: FormElFun(CalcHomeTypeForm),
    icon: faCity,
    param: 'home',
  },
  {
    title: 'Contact Info',
    form: FormElFun(CalcContactForm),
    icon: faUser,
    param: 'contact',
  },
];

const Calculator = () => {
  const formsHeadingRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramForm = searchParams.get('form');
  const [currentForm, setCurrentForm] = useState(0);
  const [formsWrapperH, setFormsWrapperH] = useState('');

  const handleNextForm = () => {
    if (currentForm + 1 === calcSteps.length) return;
    setCurrentForm((prevState) => prevState + 1);
    setSearchParams({ form: calcSteps[currentForm + 1].param });
  };

  const handlePrevForm = () => {
    if (currentForm === 0) return;
    setCurrentForm((prevState) => prevState - 1);
    setSearchParams({ form: calcSteps[currentForm - 1].param });
  };

  const widthClass = currentForm !== 3 ? `w-${currentForm + 1}/4` : 'w-full';

  const setCurFormHeight = (height) => {
    setFormsWrapperH(
      -(-height - formsHeadingRef.current.getBoundingClientRect().height) + 25
    );
  };

  useEffect(() => {
    const curParamForm = calcSteps.findIndex(
      (form) => form.param === paramForm
    );

    const curForm = curParamForm === -1 ? 0 : curParamForm;

    setCurrentForm(curForm);
  }, [paramForm]);

  useEffect(() => {
    setSearchParams({ form: calcSteps[0].param });
  }, []);

  return (
    <div
      className="w-full overflow-hidden duration-500"
      style={{ height: `${formsWrapperH}px` }}
    >
      <div className="absolute top-0 left-1/2 h-1.5 w-11/12 -translate-x-1/2 overflow-hidden rounded-xl bg-clr-italic">
        <div
          className={`absolute left-0 top-0 h-full rounded-xl bg-clr-green transition-all duration-500 ${widthClass}`}
        ></div>
      </div>
      <div
        className="relative flex w-full items-center pb-10"
        ref={formsHeadingRef}
      >
        <button
          className="absolute left-0 grid h-16 w-16 place-content-center rounded-xl border border-dashed border-transparent bg-clr-green--light hover:border-clr-text"
          type="button"
          aria-label="Go Back"
          onClick={handlePrevForm}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <div className="relative mx-auto flex items-center gap-3 overflow-hidden rounded-xl border border-clr-italic p-5 shadow-process-shadow sm:p-7">
          <div className="absolute top-0 left-0 h-0.5 w-full bg-clr-green"></div>
          <FontAwesomeIcon
            icon={calcSteps[currentForm].icon}
            className="text-clr-green"
            size="lg"
          />
          <p className=" hidden text-lg font-semibold sm:block">
            {calcSteps[currentForm].title}
          </p>
        </div>
        <p className="absolute right-0 rounded-xl p-2">
          <span className=" text-clr-green">{currentForm + 1}</span>
          /4
        </p>
      </div>
      <div className="w-full overflow-hidden duration-500">
        <CalcFormsProvider>
          {calcSteps.map((calc, i) => {
            const visibilityCl = i === currentForm ? '' : 'hidden';
            const FormComponent = calc.form;
            const isCurrentForm = i === currentForm;

            return (
              <FormComponent
                handleNextForm={handleNextForm}
                visibilityCl={visibilityCl}
                setFormHeight={setCurFormHeight}
                isCurrentForm={isCurrentForm}
                key={i}
              />
            );
          })}
        </CalcFormsProvider>
      </div>
      <div className="hidden h-px w-12 bg-clr-green"></div>
      <ul className="flex hidden flex-col items-center gap-6">
        <li className="relative before:absolute before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-x-[300%] before:-translate-y-1/2 before:rounded-full before:bg-clr-green">
          Paying through installments available.
        </li>
        <li className="relative before:absolute before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-x-[300%] before:-translate-y-1/2 before:rounded-full before:bg-clr-green">
          Quoted price can be lockdown for the next six months!
        </li>
      </ul>
    </div>
  );
};

const router = createBrowserRouter([
  { path: '/pricing', element: <Calculator /> },
]);

const CalcWrapper = () => {
  return <RouterProvider router={router} />;
};

export default CalcWrapper;
