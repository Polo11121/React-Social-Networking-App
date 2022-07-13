import React, { ChangeEventHandler, CSSProperties } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import Tooltip from '@mui/material/Tooltip';
import classnames from 'classnames';
import './Input.scss';

export type InputPropsType = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  style?: CSSProperties;
  isDisabled?: boolean;
  error?: string;
  tooltipError?: boolean;
};

export const Input = ({
  value,
  onChange,
  placeholder,
  name,
  error,
  style,
  type = 'text',
  tooltipError = false,
  isDisabled = false,
}: InputPropsType) => (
  <>
    <div
      tabIndex={0}
      className={classnames(
        'input',
        { 'input--error': error },
        { 'input--tooltip-error': tooltipError }
      )}
      style={style}
    >
      <input
        className="input__container"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={isDisabled}
      />
      {error && tooltipError && (
        <Tooltip arrow className="input__tooltip" title={error}>
          <WarningIcon style={{ color: 'red' }} />
        </Tooltip>
      )}
    </div>
    {error && !tooltipError && (
      <p style={style} className="input__error">
        {error}
      </p>
    )}
  </>
);
