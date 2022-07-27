import { ReactNode } from 'react';
import { useLogin } from 'api/useLogin';
import { LoginSchema } from 'shared/fixtures/LoginForm/LoginSchema';
import { Input, Button } from 'components';
import { useForm } from 'shared/hooks/useForm';
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

  const formik = useForm({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    mutate,
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
        size="big"
      />
      {children}
    </form>
  );
};
