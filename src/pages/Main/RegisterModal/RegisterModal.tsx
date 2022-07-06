import { Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useRegister } from 'api/useRegister';

type RegisterModalType = { isOpen: boolean; onCloseModal: () => void };

export const RegisterModal = ({ isOpen, onCloseModal }: RegisterModalType) => {
  const { mutate } = useRegister();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: (values) => mutate(values),
  });

  return (
    <Modal open={isOpen} onClose={onCloseModal}>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="name"
          placeholder="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <input
          name="email"
          placeholder="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <input
          name="passwordConfirm"
          placeholder="passwordConfirm"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
        />

        <button type="submit">Zarejestruj</button>
      </form>
    </Modal>
  );
};
