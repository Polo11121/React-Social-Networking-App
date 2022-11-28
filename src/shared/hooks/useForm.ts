import { useEffect, useState } from 'react';
import { FormikValues, useFormik } from 'formik';
import { UseMutateFunction } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseErrorType } from 'shared/types/responseTypes';
import { getTrimmedData } from 'shared/functions';

type UseFormType<T> = {
  initialValues: T;
  validateOnChange?: boolean;
  validationSchema?: any;
  mutate?: UseMutateFunction<
    AxiosResponse<any, any>,
    AxiosError<ResponseErrorType, any>,
    Record<any, any>,
    unknown
  >;
};

export const useForm = <T extends FormikValues>({
  initialValues,
  validationSchema,
  mutate,
  validateOnChange = false,
}: UseFormType<T>) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => mutate && mutate(getTrimmedData(values)),
    validateOnChange: isSubmitted || validateOnChange,
  });

  useEffect(
    () => setIsSubmitted(Boolean(formik.submitCount)),
    [formik.submitCount]
  );

  return formik;
};
