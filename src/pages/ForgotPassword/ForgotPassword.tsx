import { useFormik } from 'formik';
import { useForgotPassword } from 'api/useForgotPassword';
import { Button, LoginForm } from 'components';

export const ForgotPassword = () => {
  const { mutate } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => mutate(values),
  });

  return (
    <div>
      <LoginForm />
      <h1>Znajdź swoje konto</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Button buttonStyleType="primary" text="Anuluj" to="/login" />
        <button type="submit">Szukaj</button>
      </form>
    </div>
  );
};
