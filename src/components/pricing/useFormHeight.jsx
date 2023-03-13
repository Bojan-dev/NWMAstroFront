import { useRef, useEffect } from 'react';

const useFormHeight = (
  setFormHeight,
  isCurrentForm,
  additionalState = null
) => {
  const formRef = useRef(0);

  useEffect(() => {
    if (isCurrentForm)
      setFormHeight(formRef.current.getBoundingClientRect().height);
  }, [isCurrentForm, additionalState]);

  return { formRef };
};

export default useFormHeight;
