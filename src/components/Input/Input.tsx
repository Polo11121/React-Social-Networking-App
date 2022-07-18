import React, { ChangeEventHandler, CSSProperties } from 'react';
import { ErrorText, Tooltip } from 'components';
import WarningIcon from '@mui/icons-material/Warning';
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
      className={classnames(
        'input',
        { 'input--error': error },
        { 'input--tooltip-error': tooltipError }
      )}
      style={style}
    >
      <input
        data-tip
        data-for={`${name}-input`}
        className="input__container"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={isDisabled}
      />
      <WarningIcon
        style={{
          color: 'red',
          display: `${error && tooltipError ? 'block' : 'none'}`,
        }}
      />
    </div>
    <ErrorText
      style={{ marginBottom: '1rem', ...style }}
      isHidden={tooltipError}
      text={error}
    />
    <Tooltip
      isDisabled={!(tooltipError && error)}
      type="error"
      offset={{ bottom: 10 }}
      text={error}
      id={`${name}-input`}
      event="focusin"
      eventOff="focusout"
    />
  </>
);
