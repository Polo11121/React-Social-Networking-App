import { ChangeEventHandler } from 'react';
import { TextareaAutosize } from '@mui/material';
import './Textarea.scss';

export type TextareaPropsType = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  name?: string;
  minRows?: number;
  maxRows?: number;
};

export const Textarea = ({
  value,
  onChange,
  placeholder,
  name,
  minRows,
  maxRows,
}: TextareaPropsType) => (
  <TextareaAutosize
    minRows={minRows}
    maxRows={maxRows}
    className="textarea"
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  />
);
