import { CSSProperties, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import './Button.scss';

export type ButtonPropsType = {
  text: string;
  buttonStyleType: 'primary' | 'secondary';
  to?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  isDisabled?: boolean;
};

export const Button = ({
  text,
  to,
  style,
  buttonStyleType,
  onClick,
  type = 'button',
  fullWidth = false,
  isDisabled = false,
}: ButtonPropsType) => {
  const navigate = useNavigate();

  const switchPageTo = () => to && navigate(to);

  return (
    <button
      disabled={isDisabled}
      type={type}
      className={classnames('button', `button--${buttonStyleType}`, {
        'button--fullWidth': fullWidth,
        'button--disabled': isDisabled,
      })}
      style={style}
      onClick={to ? switchPageTo : onClick}
    >
      {text}
    </button>
  );
};
