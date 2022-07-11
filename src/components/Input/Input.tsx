import React, { ChangeEventHandler } from 'react';
import classnames from 'classnames';
import './Input.scss';

export type InputPropsType = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  isDisabled?: boolean;
  error?: string;
};

export const Input = ({
  value,
  onChange,
  placeholder,
  name,
  error,
  type = 'text',
  isDisabled = false,
}: InputPropsType) => (
  <>
    <input
      className={classnames('input', { 'input--error': error })}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={isDisabled}
    />
    {error && <p className="input__error">{error}</p>}
  </>
);
