import { ChangeEvent } from 'react';
import { IconButton, Modal } from '@mui/material';
import { useRegister } from 'api/useRegister';
import { useForm } from 'shared/hooks/useForm';
import { GenderRadioButtons } from 'pages/Main/RegisterModal/GenderRadioButtons/GenderRadioButtons';
import { BirthDatePicker } from 'shared/features/BirthDatePicker/BirthDatePicker';
import { RegisterSchema } from 'pages/Main/RegisterModal/RegisterSchema';
import { customToast } from 'shared/hooks/customToast';
import { Button, Input } from 'components';
import ClearIcon from '@mui/icons-material/Clear';
import './RegisterModal.scss';

export const RegisterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const onSuccess = () => {
    onClose();
    customToast({
      text: 'Utworzono konto. Aby zakończyć proces rejestracji, potwierdź swoje konto linkiem aktywacyjnym wysłanym na podany adres e-mail',
      autoClose: 5000,
    });
  };

  const { mutate, error, isLoading } = useRegister(onSuccess);

  const formik = useForm({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      birthDate: null,
      gender: '',
    },
    validationSchema: RegisterSchema,
    mutate,
  });

  const changeDateBirthHandler = (value: Date | null) =>
    formik.setFieldValue('birthDate', value);

  const changeGenderHandler = (event: ChangeEvent<HTMLInputElement>) =>
    formik.setFieldValue('gender', (event.target as HTMLInputElement).value);

  return (
    <Modal
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      open={isOpen}
      onClose={onClose}
    >
      <div className="register-modal">
        <IconButton className="register-modal__exit-button" onClick={onClose}>
          <ClearIcon />
        </IconButton>
        <div className="register-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Zarejestruj się</h1>
            <p>To szybkie i proste.</p>
          </div>
        </div>
        <form className="register-modal__form" onSubmit={formik.handleSubmit}>
          <div className="register-modal__form-row">
            <Input
              style={{ flex: 1 }}
              name="name"
              placeholder="Imię"
              type="text"
              tooltipError
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
            />
            <Input
              style={{ flex: 1 }}
              name="surname"
              placeholder="Nazwisko"
              type="text"
              tooltipError
              onChange={formik.handleChange}
              value={formik.values.surname}
              error={formik.errors.surname}
            />
          </div>
          <Input
            name="email"
            placeholder="E-mail"
            tooltipError
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.isValid ? error : formik.errors.email}
          />
          <Input
            name="password"
            placeholder="Hasło"
            type="password"
            tooltipError
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Input
            name="passwordConfirm"
            placeholder="Powtórz hasło"
            type="password"
            tooltipError
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            error={formik.errors.passwordConfirm}
          />
          <BirthDatePicker
            error={formik.errors.birthDate}
            value={formik.values.birthDate}
            onChange={changeDateBirthHandler}
          />
          <GenderRadioButtons
            isError={Boolean(formik.errors.gender)}
            value={formik.values.gender}
            onChange={changeGenderHandler}
          />
          <Button
            size="big"
            isDisabled={isLoading}
            fullWidth
            buttonStyleType="primary"
            type="submit"
            text="Zarejestruj się"
          />
        </form>
      </div>
    </Modal>
  );
};
