import { differenceInYears } from 'date-fns';
import * as Yup from 'yup';

export const ProfileDetailsSchema = Yup.object().shape({
  birthDate: Yup.date()
    .nullable()
    .required('Nieprawidłowa data urodzenia')
    .test('adult', 'Użytkownik musi być pełnoletni', (value) =>
      Boolean(value && differenceInYears(new Date(), new Date(value)) >= 18)
    ),
});
