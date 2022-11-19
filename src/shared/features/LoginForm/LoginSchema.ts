import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Nieprawidłowy adres e-mail')
    .required('Nieprawidłowy adres e-mail'),
  password: Yup.string().required('Wpisz hasło'),
});
