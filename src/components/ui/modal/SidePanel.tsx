// components/ui/SidePanel.tsx
'use client';
import { useEffect } from 'react';
import { DoubleArrowIcon } from '@/assets/icons';

type SidePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  width?: string;
  headings?: string;
};
export function SidePanel({
  isOpen,
  onClose,
  children,
  headings,
  width = 'w-[420px]',
}: SidePanelProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed   font-general z-9999 inset-0 bg-[#0F0F0FE0]  transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        className={`fixed m-2 max-h-[97vh] top-0 z-99999 right-0 h-full ${width} bg-[#171717] border rounded-lg  border-[#333333] z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 ' : 'translate-x-full hidden'
        }`}
      >
        {/* Header */}
        <div className="flex flex-col">
          <div className="flex backgrounddesModal font-medium bg-[#171717] items-center gap-2 text-white-100 text-base p-4 border-[#333333] border-b ">
            <DoubleArrowIcon />
            <span> {headings}</span>
          </div>
          {/*   <div className={`flex items-start ${className} justify-between`}>
            <div>
              {/* <h2 className="text-white text-2xl font-semibold leading-tight">
                {title}
              </h2> 
              {/*  {subtitle && (
                <p className="text-white-100 text-sm mt-1">{subtitle}</p>
              )}
            </div>
          </div> */}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 no-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
}
