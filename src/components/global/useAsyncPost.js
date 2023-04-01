import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

const useAsyncPost = (setFormErrors = false) => {
  const [resMessage, setResMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      error.forEach((errObj) => {
        setFormErrors(errObj.key, {
          type: '400',
          message: errObj.value.message,
        });
      });
    }
  }, [error]);

  const handleAsync = async (path, dataObj) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post(`/${path}`, dataObj);

      const data = res.data;

      setResMessage(data.message);
    } catch (err) {
      const errors = err.response.data.errors || err.response.data.error;
      console.log(errors);
      setError(errors);
    }

    setIsLoading(false);
  };

  return { handleAsync, isLoading, error, setError, resMessage };
};

export default useAsyncPost;
