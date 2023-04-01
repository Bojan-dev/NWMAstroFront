import { useState, createContext, useContext } from 'react';

const calcFormInitial = {
  destination: {},
  date: {},
  homeType: {},
};

const CalcFormsCtx = createContext(calcFormInitial);

const CalcFormsProvider = ({ children }) => {
  const [calcForms, setCalcForms] = useState(calcFormInitial);

  const handleCalcFormsData = (formType, formValue) => {
    setCalcForms((prevState) => ({
      ...prevState,
      [formType]: {
        ...prevState[formType],
        ...formValue,
      },
    }));

    if (formType === 'contact') setAreAllFormsSubmitted(true);
  };

  return (
    <CalcFormsCtx.Provider value={{ calcForms, handleCalcFormsData }}>
      {children}
    </CalcFormsCtx.Provider>
  );
};

export const useSetFormsData = () => {
  const { handleCalcFormsData } = useContext(CalcFormsCtx);

  return handleCalcFormsData;
};

export const useGetFormsInfo = () => {
  const { calcForms } = useContext(CalcFormsCtx);

  return { calcForms };
};

export default CalcFormsProvider;
