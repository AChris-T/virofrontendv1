import React, { ReactNode } from 'react';

type WithClassName = { className?: string };

interface TableContainerProps extends WithClassName {
  children: ReactNode;
}

interface TableProps extends WithClassName {
  children: ReactNode;
}

interface TableHeaderProps extends WithClassName {
  children: ReactNode;
}

interface TableBodyProps extends WithClassName {
  children: ReactNode;
}

interface TableRowProps extends WithClassName {
  children: ReactNode;
}

interface TableCellProps extends WithClassName {
  children: ReactNode;
  isHeader?: boolean;
}

const TableContainer: React.FC<TableContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`w-full max-w-full min-w-0 overflow-hidden rounded-[16px] border border-[#202124] bg-[#0B0B0B] ${className}`}
    >
      <div className="w-full max-w-full overflow-x-auto overscroll-x-contain">
        {children}
      </div>
    </div>
  );
};

const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <table className={`w-full border-collapse border-spacing-0 ${className}`}>
      {children}
    </table>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <thead
      className={`text-white/55 text-[10px] sm:text-[12px] font-general ${className}`}
    >
      {children}
    </thead>
  );
};

const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
  return <tbody className={className}>{children}</tbody>;
};

const TableRow: React.FC<TableRowProps> = ({ children, className = '' }) => {
  return (
    <tr className={`border-b-0 border-0 border-[#202124]    ${className}`}>
      {children}
    </tr>
  );
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className = '',
}) => {
  const CellTag = isHeader ? 'th' : 'td';
  return (
    <CellTag
      className={`px-2 sm:px-5 py-2 sm:py-4 align-middle text-xs sm:text-sm ${isHeader ? 'font-normal font-general text-left text-white/55' : 'text-white/80'} ${className}`}
    >
      {children}
    </CellTag>
  );
};

export { TableContainer, Table, TableHeader, TableBody, TableRow, TableCell };
