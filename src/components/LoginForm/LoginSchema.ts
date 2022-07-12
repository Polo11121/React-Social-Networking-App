import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Wpisz email'),
  password: Yup.string().required('Wpisz hasło'),
});
