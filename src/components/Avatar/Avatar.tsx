import { CSSProperties } from 'react';
import { Avatar } from '@mui/material';
import { formatImageUrl } from 'shared/functions';

type CustomAvatarPropsType = {
  src?: string;
  className?: string;
  alt?: string;
  style?: CSSProperties;
};

export const CustomAvatar = ({
  src,
  className,
  alt,
  style,
}: CustomAvatarPropsType) => (
  <Avatar
    src={formatImageUrl(src)}
    className={className}
    alt={alt}
    style={style}
  />
);
