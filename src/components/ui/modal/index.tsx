'use client';
import { CloseIcon } from '@/assets/icons';
import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  Title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  Title,
  children,
  className,
  showCloseButton = true, // Default to true for backwards compatibility
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? 'w-full  mx-auto'
    : 'relative w-full  rounded-[15px] mx-auto  dark:bg-gray-900';

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-[#0F0F0FE0] backdrop-blur-xs"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={modalRef}
        className={`${contentClasses}  ${className} bg-[#060606] flex flex-col `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-[#0F0F0F] justify-between w-full relative px-4 py-3">
          <h3 className="text-base font-general text-white-100 ">{Title}</h3>
          {showCloseButton && (
            <button onClick={onClose} className=" ">
              <CloseIcon fill={'#BFBFBF'} />
            </button>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};
