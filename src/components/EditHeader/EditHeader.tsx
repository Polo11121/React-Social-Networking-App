import { Button } from 'components';
import './EditHeader.scss';

export type EditHeaderPropsType = {
  text: string;
  onSubmit: () => void;
  onClose: () => void;
  isDisabled?: boolean;
};

export const EditHeader = ({
  text,
  onSubmit,
  onClose,
  isDisabled = false,
}: EditHeaderPropsType) => {
  return (
    <div className="edit-header">
      <p>{text}</p>
      <div className="edit-header__buttons">
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
};
