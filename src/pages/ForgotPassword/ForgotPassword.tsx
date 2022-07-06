import { useFormik } from 'formik';
import { useForgotPassword } from 'api/useForgotPassword';
import { LinkButton, LoginForm } from 'components';

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
      <LoginForm isLinkHidden />
      <h1>Znajdź swoje konto</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <LinkButton text="Anuluj" to="/login" />
        <button type="submit">Szukaj</button>
      </form>
    </div>
  );
};
