import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  passwordCurrent: Yup.string().required('Wpisz stare hasło'),
  password: Yup.string()
    .min(8, 'Hasło musi mieć conajmniej 8 znaków')
    .required('Hasło musi mieć conajmniej 8 znaków'),
  passwordConfirm: Yup.string().test(
    'equals passwords',
    'Nieprawidłowe hasło',
    (value, ctx) =>
      Boolean(value && ctx.parent.password === value && value.length > 7)
  ),
});
