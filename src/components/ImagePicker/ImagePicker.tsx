import { ChangeEvent, useRef } from 'react';
import { Tooltip } from 'components';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './ImagePicker.scss';

export type ImagePickerPropsType = {
  handleFile: (file: File | null) => void;
  text?: string;
  tooltipText?: string;
};

export const ImagePicker = ({
  handleFile,
  text,
  tooltipText,
}: ImagePickerPropsType) => {
  const hiddenFileInput = useRef<null | HTMLInputElement>(null);

  const handleClick = () => hiddenFileInput.current?.click();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleFile(event.target.files ? event.target.files[0] : null);

  return (
    <>
      <button
        data-tip
        data-for={tooltipText}
        className={`image-picker__button image-picker__button--${
          text ? 'text' : 'circle'
        }`}
        onClick={handleClick}
      >
        <CameraAltIcon
          style={text ? { marginRight: '5px' } : {}}
          fontSize={text ? 'small' : 'medium'}
        />
        {text}
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <Tooltip
        isDisabled={!tooltipText}
        id={tooltipText || ''}
        text={tooltipText}
        type="dark"
      />
    </>
  );
};
