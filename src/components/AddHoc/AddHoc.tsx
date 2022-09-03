import { ChangeEventHandler, ReactNode, useState } from 'react';
import { Input, Button } from 'components';
import { capitalizeFirstLetter } from 'shared/functions';
import {
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { BirthDatePicker } from 'pages/Main/RegisterModal/BirthDatePicker/BirthDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './AddHoc.scss';

type AddHocPropsType = {
  value?: string | Date;
  displayValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClose?: () => void;
  onSubmit?: () => void;
  onDelete?: () => void;
  label?: string;
  isDisabled?: boolean;
  name?: string;
  placeholder?: string;
  Icon?: ReactNode;
  displayText?: string;
  options?: { label: string; value: string }[];
  hideDelete?: boolean;
  inputType?: 'select' | 'input' | 'datePicker';
  disableEdit?: boolean;
  displayOnly?: boolean;
};

export const AddHoc = ({
  value,
  onChange,
  placeholder,
  name,
  onDelete,
  onClose,
  onSubmit,
  label,
  Icon,
  displayText,
  options,
  displayValue,
  inputType = 'input',
  hideDelete = false,
  isDisabled = false,
  disableEdit = false,
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

  const chooseInput = () => {
    if (inputType === 'datePicker' && value) {
      return (
        <BirthDatePicker
          value={new Date(value)}
          onChange={onChange as unknown as (value: Date | null) => {}}
        />
      );
    }
    if (inputType === 'select') {
      return (
        <FormControl fullWidth>
          <InputLabel id={`select-${name}-label`}>
            {label || placeholder}
          </InputLabel>
          <Select
            labelId={`select-${name}-label`}
            name={name}
            value={value as string}
            label="Age"
            onChange={
              onChange as
                | ((event: SelectChangeEvent<string>, child: ReactNode) => void)
                | undefined
            }
          >
            {options?.map(({ value: optionValue, label: optionLabel }) => (
              <MenuItem value={optionValue}>{optionLabel}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    if (onChange) {
      return (
        <Input
          style={{ margin: '0' }}
          placeholder={label || capitalizeFirstLetter(placeholder)}
          value={value as string}
          onChange={onChange}
          name={name}
        />
      );
    }

    return null;
  };

  if ((value && !adHocVisibility) || displayOnly) {
    return (
      <div className="add-hoc">
        <div className="add-hoc__display">
          {Icon} {displayText}:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {displayValue || (value as string)}
          </span>
        </div>
        {!disableEdit && (
          <IconButton
            onClick={handleModalClick}
            className="add-hoc__menu-button"
          >
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
    );
  }

  return (
    <>
      {adHocVisibility ? (
        <>
          {chooseInput()}
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
