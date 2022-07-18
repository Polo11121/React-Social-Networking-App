import * as Yup from 'yup';

export const ForgotPasswordSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email('Nieprawidłowy adres e-mail')
    .required('Nieprawidłowy adres e-mail'),
});
