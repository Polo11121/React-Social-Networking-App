import { Button } from 'components';
import './ProfilePreviewEditHeader.scss';

export type ProfilePreviewEditHeaderPropsType = {
  text: string;
  onSubmit: () => void;
  onClose: () => void;
  isDisabled?: boolean;
};

export const ProfilePreviewEditHeader = ({
  text,
  onSubmit,
  onClose,
  isDisabled = false,
}: ProfilePreviewEditHeaderPropsType) => (
  <div className="profile-preview-edit-header">
    <p>{text}</p>
    <div className="profile-preview-edit-header__buttons">
      <Button onClick={onClose} text="Anuluj" buttonStyleType="mandy" />
      <Button
        isDisabled={isDisabled}
        onClick={onSubmit}
        text="Zapisz"
        buttonStyleType="primary"
      />
    </div>
  </div>
);
