import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object().shape({
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
