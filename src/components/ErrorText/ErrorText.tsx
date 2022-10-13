import { CSSProperties } from 'react';

export type ErrorTextPropsType = {
  text?: string;
  style?: CSSProperties;
  isHidden?: boolean;
};

export const ErrorText = ({ text, style, isHidden }: ErrorTextPropsType) =>
  text && !isHidden ? <p style={{ ...style, color: 'red' }}>{text}</p> : null;
