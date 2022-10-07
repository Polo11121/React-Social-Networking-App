import { ReactNode, useState } from 'react';
import { Button } from 'components';
import { IconButton, ListItemText, Menu, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './AddHoc.scss';

type AddHocPropsType = {
  value?: string | Date;
  displayValue?: string | number;
  onClose?: () => void;
  onSubmit?: () => void;
  onDelete?: () => void;
  isDisabled?: boolean;
  placeholder?: string;
  Icon?: ReactNode;
  displayText?: string;
  hideDelete?: boolean;
  displayOnly?: boolean;
  children?: ReactNode;
};

export const AddHoc = ({
  value,
  placeholder,
  onDelete,
  onClose,
  onSubmit,
  Icon,
  displayText,
  displayValue,
  children,
  hideDelete = false,
  isDisabled = false,
  displayOnly = false,
}: AddHocPropsType) => {
  const [adHocVisibility, setAdHocVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleModalClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleModalClose = () => setAnchorEl(null);

  const hideAdHoc = () => {
    setAdHocVisibility(false);

    if (onClose) {
      onClose();
    }
  };

  const showAdHoc = () => {
    setAdHocVisibility(true);
    handleModalClose();
  };

  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit();
    }

    setAdHocVisibility(false);
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete();
    }

    handleModalClose();
  };

  return (value && !adHocVisibility) || displayOnly ? (
    <div className="add-hoc">
      <div className="add-hoc__display">
        {Icon} {displayText}:{' '}
        <span className="add-hoc__display-value">
          {displayValue || (value as string)}
        </span>
      </div>
      {!displayOnly && (
        <IconButton onClick={handleModalClick} className="add-hoc__menu-button">
          <MoreHorizIcon />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleModalClose}
      >
        <MenuItem onClick={showAdHoc}>
          <EditIcon className="post__icon" />
          <ListItemText>Edytuj</ListItemText>
        </MenuItem>
        {!hideDelete && (
          <MenuItem onClick={handleDelete}>
            <DeleteIcon className="post__icon" />
            <ListItemText>Usuń</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </div>
  ) : (
    <>
      {adHocVisibility ? (
        <>
          {children}
          <div className="add-hoc__input-button">
            <Button buttonStyleType="mandy" text="Anuluj" onClick={hideAdHoc} />
            <Button
              isDisabled={isDisabled}
              buttonStyleType="primary"
              text="Zapisz"
              onClick={handleSubmit}
            />
          </div>
        </>
      ) : (
        <IconButton
          style={{ marginRight: 'auto' }}
          edge="start"
          onClick={showAdHoc}
          disableRipple
          className="add-hoc"
        >
          <AddCircleOutlineIcon
            fontSize="large"
            className="add-hoc__add-icon"
          />
          <p className="add-hoc__add-text">Dodaj {placeholder}</p>
        </IconButton>
      )}
    </>
  );
};
