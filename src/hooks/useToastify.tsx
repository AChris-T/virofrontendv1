import React from 'react';
import { toast, ToastOptions, Id } from 'react-toastify';
import { useCallback, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorIcon, SuccessIcon } from '@/assets/icons';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

interface UseToastifyReturn {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => Id;
  dismiss: () => void;
}

function ToastIcon({ type }: { type: ToastType }) {
  const isError = type === 'error';
  return <div className="">{isError ? <ErrorIcon /> : <SuccessIcon />}</div>;
}

function ToastContent({ message, type }: { message: string; type: ToastType }) {
  const title =
    type === 'error'
      ? 'Error'
      : type === 'warning'
        ? 'Warning'
        : type === 'info'
          ? 'Info'
          : 'Success';

  return (
    <div className="viro-toast__content z-999">
      <div className="">
        <div className="viro-toast__left">
          <ToastIcon type={type} />
          <span
            className={`viro-toast__title ${
              type === 'error'
                ? 'text-red-500'
                : type === 'warning'
                  ? 'text-yellow-300'
                  : type === 'info'
                    ? 'text-blue-300'
                    : 'text-[#3BB243]'
            } `}
          >
            {title}
          </span>
        </div>
      </div>
      <div className="viro-toast__message bg-[#2E2E2E]  font-general p-2 mt-2 rounded">
        {message}
      </div>
    </div>
  );
}

const useToastify = (): UseToastifyReturn => {
  const activeToastIdRef = useRef<Id | null>(null);

  const dismissActiveToast = useCallback((): void => {
    if (activeToastIdRef.current !== null) {
      toast.dismiss(activeToastIdRef.current);
      activeToastIdRef.current = null;
    }
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = 'default',
      options: ToastOptions = {}
    ): Id => {
      const toastOptions: ToastOptions = {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        icon: false,
        className: 'viro-toast',
        /*         bodyClassName: 'viro-toast__body ',
         */ ...options,
      };

      dismissActiveToast();

      const toastHandlers: Record<
        ToastType,
        (content: React.ReactNode, opts?: ToastOptions) => Id
      > = {
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
        default: toast,
      };

      const toastHandler = toastHandlers[type];
      const toastId = toastHandler(
        <ToastContent message={message} type={type} />,
        toastOptions
      );
      activeToastIdRef.current = toastId;
      return toastId;
    },
    [dismissActiveToast]
  );

  const dismiss = useCallback((): void => {
    dismissActiveToast();
  }, [dismissActiveToast]);

  return {
    showToast,
    dismiss,
  };
};

export default useToastify;
