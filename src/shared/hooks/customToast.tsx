import { toast, ToastPosition } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type CustomToastType = {
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
  pauseOnFocusLoss?: boolean;
};

export const customToast = ({
  text,
  progress,
  position = 'top-right',
  autoClose = 2000,
  hideProgressBar = true,
  closeOnClick = true,
  pauseOnHover = false,
  closeButton = false,
  draggable = true,
  pauseOnFocusLoss = false,
}: CustomToastType) =>
  toast(text, {
    type: 'default',
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
      color: '#006f71',
    },
  });
