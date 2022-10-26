import { CSSProperties } from 'react';
import { toast, ToastPosition, TypeOptions } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type CustomToastPropsType = {
  text: string;
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: string | number;
  closeButton?: boolean;
  isSuccess?: boolean;
  style?: CSSProperties;
  pauseOnFocusLoss?: boolean;
  type?: TypeOptions;
};

export const customToast = ({
  text,
  progress,
  style,
  type = 'default',
  position = 'top-right',
  autoClose = 2000,
  hideProgressBar = true,
  closeOnClick = true,
  pauseOnHover = false,
  closeButton = false,
  draggable = true,
  pauseOnFocusLoss = false,
}: CustomToastPropsType) =>
  toast(text, {
    type,
    position,
    icon: <CheckCircleIcon />,
    closeButton,
    pauseOnFocusLoss,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
    style: {
      ...style,
      color: '#006f71',
    },
  });
