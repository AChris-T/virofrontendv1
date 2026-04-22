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
  iconTitle?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  iconTitle,
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
    : 'relative w-full  rounded-[15px] mx-auto border-[#333333] border  dark:bg-gray-900';

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
        className={`${contentClasses}  ${className} bg-[#171717] flex flex-col `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex backgrounddesModal items-center  justify-between w-full relative px-4 py-3">
          <h3 className="text-base flex items-center gap-2 font-medium font-general text-white-100 ">
            {iconTitle}
            {Title}
          </h3>
          {showCloseButton && (
            <button onClick={onClose} className=" ">
              <CloseIcon fill={'#BFBFBF'} />
            </button>
          )}
        </div>
        <div className="bg-[#2E2E2E] m-2 rounded-lg">{children}</div>
      </div>
    </div>,
    document.body
  );
};
