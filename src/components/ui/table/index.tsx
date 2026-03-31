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
      className={`w-full overflow-x-auto rounded-[16px] border border-[#202124] bg-[#0B0B0B] ${className}`}
    >
      {children}
    </div>
  );
};

const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <table
      className={`w-full min-w-[720px] border-collapse  border-spacing-0 ${className}`}
    >
      {children}
    </table>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <thead className={`text-white/55 text-[12px] font-general ${className}`}>
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
      className={`px-5 py-4 align-middle ${isHeader ? 'text-xs font-normal font-general text-left' : 'text-white/80 text-sm'} ${className}`}
    >
      {children}
    </CellTag>
  );
};

export { TableContainer, Table, TableHeader, TableBody, TableRow, TableCell };
