import { ReactNode } from 'react';
import { useFormik } from 'formik';
import { useLogin } from 'api/useLogin';
import { LoginSchema } from 'components/LoginForm/LoginSchema';
import { Input, Button } from 'components';
import './LoginForm.scss';

export const LoginForm = ({ children }: { children?: ReactNode }) => {
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
    <form className="login-form" onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        name="email"
        placeholder="E-mail"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.isValid ? error : formik.errors.email}
      />
      <Input
        type="password"
        name="password"
        placeholder="Hasło"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Button
        isDisabled={isLoading}
        fullWidth
        buttonStyleType="primary"
        type="submit"
        text="Zaloguj się"
      />
      {children}
    </form>
  );
};
