import { ToastOptions,Zoom } from 'react-toastify';
export const toastConfig: ToastOptions = {
    position: "top-center",
    autoClose: 3000,
    theme: "dark",
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    closeOnClick: true,
    transition: Zoom,
    closeButton: false,
  };