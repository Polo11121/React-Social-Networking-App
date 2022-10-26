import * as Yup from 'yup';

export const ChangeEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Nieprawidłowy adres e-mail')
    .required('Podaj nowy adres e-mail'),
});
