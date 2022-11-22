import { CSSProperties } from 'react';
import { Avatar } from '@mui/material';
import { formatImageUrl } from 'shared/functions';

type CustomAvatarPropsType = {
  src?: string;
  className?: string;
  alt?: string;
  style?: CSSProperties;
  formatImage?: boolean;
};

export const CustomAvatar = ({
  src,
  className,
  alt,
  style,
  formatImage = true,
}: CustomAvatarPropsType) => (
  <Avatar
    src={formatImage ? formatImageUrl(src) : src}
    className={className}
    alt={alt}
    style={style}
  />
);
