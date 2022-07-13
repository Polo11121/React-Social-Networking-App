import { ChangeEvent } from 'react';
import { Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useRegister } from 'api/useRegister';

import { GenderRadioButtons } from 'pages/Main/RegisterModal/GenderRadioButtons/GenderRadioButtons';
import { BirthDatePicker } from 'pages/Main/RegisterModal/BirthDatePicker/BirthDatePicker';
import { RegisterSchema } from 'pages/Main/RegisterModal/RegisterSchema';
import { Button, Input } from 'components';
import ClearIcon from '@mui/icons-material/Clear';
import './RegisterModal.scss';

type RegisterModalType = { isOpen: boolean; onCloseModal: () => void };

export const RegisterModal = ({ isOpen, onCloseModal }: RegisterModalType) => {
  const { mutate } = useRegister();

  const formik = useFormik({
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
    onSubmit: (values) => mutate(values),
  });

  formik.validateOnChange = Boolean(formik.submitCount);

  const changeDateBirthHandler = (value: Date | null) =>
    formik.setFieldValue('birthDate', value);

  const changeGenderHandler = (event: ChangeEvent<HTMLInputElement>) =>
    formik.setFieldValue('gender', (event.target as HTMLInputElement).value);

  return (
    <Modal
      style={{ display: 'grid', placeItems: 'center' }}
      open={isOpen}
      onClose={onCloseModal}
    >
      <div className="register-modal">
        <ClearIcon
          className="register-modal__exit-button"
          onClick={onCloseModal}
        />
        <div className="register-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Zarejestruj się</h1>
            <p>To szybkie i proste.</p>
          </div>
        </div>
        <form className="register-modal__form" onSubmit={formik.handleSubmit}>
          <div className="register-modal__form-row">
            <Input
              style={{ marginRight: '1rem' }}
              name="name"
              placeholder="Imię"
              type="text"
              tooltipError
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
            />
            <Input
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
            error={formik.errors.email}
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
            isError={Boolean(formik.errors.birthDate)}
            value={formik.values.birthDate}
            onChange={changeDateBirthHandler}
          />
          <GenderRadioButtons
            isError={Boolean(formik.errors.gender)}
            value={formik.values.gender}
            onChange={changeGenderHandler}
          />
          <Button
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
