import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Wpisz imię'),
  surname: Yup.string().required('Wpisz nazwisko'),
  email: Yup.string()
    .email('Nieprawidłowy adres email')
    .required('Wpisz e-mail'),
  password: Yup.string()
    .min(8, 'Hasło musi mieć conajmniej 8 znaków')
    .required('Wpisz hasło'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Hasła nie są identyczne')
    .required('Powtóz hasło'),
  birthDate: Yup.date().required('Podaj date urodzenia'),
  gender: Yup.string().required('Wybierz płeć'),
});
