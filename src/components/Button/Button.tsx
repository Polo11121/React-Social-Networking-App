import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Spinner } from 'components';
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
  isLoading?: boolean;
  Icon?: ReactNode;
  testId?: string;
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
  isLoading = false,
  testId,
}: ButtonPropsType) => (
  <button
    data-testid={testId}
    disabled={isDisabled || isLoading}
    type={type}
    className={classnames(
      'button',
      `button--${size}`,
      `button--${buttonStyleType}`,
      {
        'button--fullWidth': fullWidth,
        'button--disabled': isDisabled || isLoading,
      }
    )}
    style={style}
    onClick={onClick}
  >
    {isLoading && <Spinner style={{ position: 'absolute', color: '#fff' }} />}
    <div
      className={classnames('button__content', {
        'button__content--loading': isLoading,
      })}
    >
      {Icon}
      {text}
    </div>
  </button>
);
