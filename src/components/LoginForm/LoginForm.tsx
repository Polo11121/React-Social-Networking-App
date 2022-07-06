import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useLogin } from 'api/useLogin';
import './LoginForm.scss';

export const LoginForm = ({
  isLinkHidden = false,
}: {
  isLinkHidden?: boolean;
}) => {
  const { mutate } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => mutate(values),
  });

  return (
    <form className="login-form" onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Zaloguj się</button>
      {!isLinkHidden && <Link to="/forgotPassword">Nie pamietasz hasła ?</Link>}
    </form>
  );
};
