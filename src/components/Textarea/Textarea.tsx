import { TextareaAutosize } from '@mui/material';
import { ChangeEventHandler } from 'react';
import './Textarea.scss';

export type TextareaPropsType = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  name?: string;
  minRows?: number;
};

export const Textarea = ({
  value,
  onChange,
  placeholder,
  name,
  minRows,
}: TextareaPropsType) => (
  <TextareaAutosize
    minRows={minRows}
    className="textarea"
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  />
);
