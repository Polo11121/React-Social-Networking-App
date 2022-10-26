import { useState } from 'react';
import { Button } from 'components';
import { ProfileDetailsDeleteAccountModal } from 'pages/Profile/ProfileDetails/ProfileDetailsDeleteAccount/ProfileDetailsDeleteAccountModal/ProfileDetailsDeleteAccountModal';

export const ProfileDetailsDeleteAccount = () => {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const modalVisibilityHandler = () =>
    setIsDeleteAccountModalOpen((prevState) => !prevState);

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Usuń konto</h2>
      <Button
        size="big"
        buttonStyleType="primary"
        onClick={modalVisibilityHandler}
        text="Usuń konto"
        type="submit"
        style={{ margin: '0 auto' }}
      />
      {isDeleteAccountModalOpen && (
        <ProfileDetailsDeleteAccountModal
          isOpen={isDeleteAccountModalOpen}
          onClose={modalVisibilityHandler}
        />
      )}
    </div>
  );
};
