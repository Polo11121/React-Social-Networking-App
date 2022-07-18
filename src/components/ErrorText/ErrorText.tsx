import { CSSProperties } from 'react';

export type ErrorTextType = {
  text?: string;
  style?: CSSProperties;
  isHidden?: boolean;
};

export const ErrorText = ({ text, style, isHidden }: ErrorTextType) =>
  text && !isHidden ? <p style={{ ...style, color: 'red' }}>{text}</p> : null;
