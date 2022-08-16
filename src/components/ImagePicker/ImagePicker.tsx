import { ChangeEvent, useRef } from 'react';
import { Tooltip } from 'components';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './ImagePicker.scss';

export type ImagePickerPropsType = {
  handleFile: (file: File | FileList | null) => void;
  text?: string;
  tooltipText?: string;
  isMultiple?: boolean;
};

export const ImagePicker = ({
  handleFile,
  text,
  tooltipText,
  isMultiple = false,
}: ImagePickerPropsType) => {
  const hiddenFileInput = useRef<null | HTMLInputElement>(null);

  const handleClick = () => hiddenFileInput.current?.click();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    event.target.files &&
    handleFile(isMultiple ? event.target.files : event.target.files[0]);

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
          style={text ? { marginRight: '0.313rem' } : {}}
          fontSize={text ? 'small' : 'medium'}
        />
        {text}
      </button>
      <input
        type="file"
        multiple={isMultiple}
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
