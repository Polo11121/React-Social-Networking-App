import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import classnames from 'classnames';
import './Button.scss';

export type ButtonPropsType = {
  text: string;
  buttonStyleType: 'primary' | 'secondary' | 'mandy';
  size?: 'small' | 'normal' | 'big';
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  isDisabled?: boolean;
  Icon?: ReactNode;
};

export const Button = ({
  text,
  style,
  buttonStyleType,
  onClick,
  Icon,
  type = 'button',
  size = 'normal',
  fullWidth = false,
  isDisabled = false,
}: ButtonPropsType) => (
  <button
    disabled={isDisabled}
    type={type}
    className={classnames(
      'button',
      `button--${size}`,
      `button--${buttonStyleType}`,
      {
        'button--fullWidth': fullWidth,
        'button--disabled': isDisabled,
      }
    )}
    style={style}
    onClick={onClick}
  >
    {Icon}
    {text}
  </button>
);
