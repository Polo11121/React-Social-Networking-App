import { differenceInYears } from 'date-fns';
import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Wpisz imię'),
  surname: Yup.string().required('Wpisz nazwisko'),
  email: Yup.string()
    .email('Nieprawidłowy adres e-mail')
    .required('Nieprawidłowy adres e-mail'),
  password: Yup.string()
    .min(8, 'Hasło musi mieć conajmniej 8 znaków')
    .required('Hasło musi mieć conajmniej 8 znaków'),
  passwordConfirm: Yup.string().test(
    'equals passwords',
    'Nieprawidłowe hasło',
    (value, ctx) =>
      Boolean(value && ctx.parent.password === value && value.length > 7)
  ),
  birthDate: Yup.date()
    .nullable()
    .required('Nieprawidłowa data urodzenia')
    .test(
      'adult',
      'Żeby założyć konto, użytkownik musi być pełnoletni',
      (value) =>
        Boolean(value && differenceInYears(new Date(), new Date(value)) >= 18)
    ),
  gender: Yup.string().required('Wybierz płeć'),
});
