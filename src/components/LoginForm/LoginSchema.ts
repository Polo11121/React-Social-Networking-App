import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Wpisz e-mail'),
  password: Yup.string().required('Wpisz hasło'),
});
