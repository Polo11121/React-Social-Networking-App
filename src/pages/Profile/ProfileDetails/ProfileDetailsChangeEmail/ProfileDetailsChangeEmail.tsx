import { useState } from 'react';
import { ChangeEmailSchema } from 'pages/Profile/ProfileDetails/ProfileDetailsChangeEmail/ChangeEmailSchema';
import { Input, Button } from 'components';
import { useForm } from 'shared/hooks/useForm';
import { useChangeEmail } from 'api/useChangeEmail';
import { ProfileDetailsChangeEmailModal } from 'pages/Profile/ProfileDetails/ProfileDetailsChangeEmail/ProfileDetailsChangeEmailModal/ProfileDetailsChangeEmailModal';

export const ProfileDetailsChangeEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeModalVisibilityHandler = () =>
    setIsModalOpen((prevState) => !prevState);

  const {
    mutateAsync: mutate,
    isLoading,
    error,
  } = useChangeEmail(changeModalVisibilityHandler);

  const formik = useForm({
    initialValues: {
      email: '',
    },
    validationSchema: ChangeEmailSchema,
    mutate,
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Zmień adres e-mail</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          placeholder="Nowy adres e-mail"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.isValid ? error : formik.errors.email}
          testId="change-email-input"
        />
        <Button
          size="big"
          isDisabled={isLoading}
          buttonStyleType="primary"
          text="Zmień e-mail"
          type="submit"
          style={{ margin: '0 auto' }}
          testId="change-email-submit-button"
        />
      </form>
      {isModalOpen && <ProfileDetailsChangeEmailModal isOpen={isModalOpen} />}
    </div>
  );
};
