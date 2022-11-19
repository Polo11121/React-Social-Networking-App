import { ChangeEvent, useRef, useEffect } from 'react';
import { Tooltip } from 'components';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './ImagePicker.scss';

export type ImagePickerPropsType = {
  onChooseFile: (file: File | FileList | null) => void;
  text?: string;
  tooltipText?: string;
  isMultiple?: boolean;
  testId?: string;
  image?: File | null;
};

export const ImagePicker = ({
  onChooseFile,
  text,
  tooltipText,
  testId,
  isMultiple = false,
  image,
}: ImagePickerPropsType) => {
  const hiddenFileInput = useRef<null | HTMLInputElement>(null);

  const clickHandler = () => hiddenFileInput.current?.click();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    event.target.files &&
    onChooseFile(isMultiple ? event.target.files : event.target.files[0]);

  useEffect(() => {
    if (!image && hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  }, [image]);

  return (
    <>
      <button
        type="button"
        data-tip
        data-for={tooltipText}
        className={`image-picker__button image-picker__button--${
          text ? 'text' : 'circle'
        }`}
        onClick={clickHandler}
      >
        <CameraAltIcon
          style={text ? { marginRight: '0.313rem' } : {}}
          fontSize={text ? 'small' : 'medium'}
        />
        {text}
      </button>
      <input
        data-testid={testId}
        type="file"
        multiple={isMultiple}
        ref={hiddenFileInput}
        onChange={changeHandler}
        style={{ visibility: 'hidden', width: 0, height: 0 }}
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
