import { toast, ToastOptions, Zoom } from 'react-toastify';

// Cấu hình mặc định
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

// Helper functions để hiển thị toast với cấu hình đã định sẵn
export const toastService = {
  success: (message: string, options?: ToastOptions) => {
    toast.dismiss(); // Xóa các toast đang hiển thị trước
    return toast.success(message, { ...toastConfig, ...options });
  },
  error: (message: string, options?: ToastOptions) => {
    toast.dismiss(); // Xóa các toast đang hiển thị trước
    return toast.error(message, { ...toastConfig, ...options });
  },
  info: (message: string, options?: ToastOptions) => {
    toast.dismiss(); // Xóa các toast đang hiển thị trước
    return toast.info(message, { ...toastConfig, ...options });
  },
  warning: (message: string, options?: ToastOptions) => {
    toast.dismiss(); // Xóa các toast đang hiển thị trước
    return toast.warning(message, { ...toastConfig, ...options });
  }
};