import { ReactNode } from 'react';
import { useFormik } from 'formik';
import { useLogin } from 'api/useLogin';
import { LoginSchema } from 'components/LoginForm/LoginSchema';
import { Input, Button } from 'components';
import classnames from 'classnames';
import './LoginForm.scss';

export const LoginForm = ({
  children,
  isInverse = false,
}: {
  children?: ReactNode;
  isInverse?: boolean;
}) => {
  const { mutate, error, isLoading } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: (values) => mutate(values),
  });

  return (
    <form
      className={classnames('login-form', { 'login-form--inverse': isInverse })}
      onSubmit={formik.handleSubmit}
    >
      <Input
        style={isInverse ? { margin: '0 1rem 0 0' } : {}}
        tooltipError={isInverse}
        type="text"
        name="email"
        placeholder="E-mail"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.isValid ? error : formik.errors.email}
      />
      <Input
        style={isInverse ? { margin: '0 1rem 0 0' } : {}}
        tooltipError={isInverse}
        type="password"
        name="password"
        placeholder="Hasło"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Button
        isDisabled={isLoading}
        fullWidth={!isInverse}
        buttonStyleType="primary"
        type="submit"
        text="Zaloguj się"
      />
      {children}
    </form>
  );
};
