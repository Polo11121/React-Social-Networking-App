import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

type LinkButtonType = {
  text: string;
  to: string;
  style?: CSSProperties;
  className?: string;
};

export const LinkButton = ({ text, to, style, className }: LinkButtonType) => {
  const navigate = useNavigate();

  const switchPageTo = () => navigate(to);

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={switchPageTo}
    >
      {text}
    </button>
  );
};
