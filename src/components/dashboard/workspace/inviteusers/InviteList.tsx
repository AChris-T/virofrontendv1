'use client';
import React from 'react';
import AvatarText from '@/components/ui/avatar/AvatarText';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteIcon, EditIcon } from '@/assets/icons';
import Pagination from '@/components/ui/Pagination/Pagination';
import StatusPill, { UserStatus } from '@/components/ui/status/StatusPill';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type UserRow = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  status: UserStatus;
};

export default function InviteList() {
  const rows: UserRow[] = [
    {
      id: '1',
      name: 'Olivia Rhye',
      email: 'oliviarhye@pico.co',
      jobTitle: 'Sales Manager',
      department: 'Sales',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Stephen Myles',
      email: 'mylessteph@pico.co',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Violet Lin Lin',
      email: 'linlin@pico.co',
      jobTitle: 'Customer Support',
      department: 'Support',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Abey Uguamju',
      email: 'uguamju@pico.co',
      jobTitle: 'Product Manager',
      department: 'Product',
      status: 'Invited',
    },
    {
      id: '5',
      name: 'Blake Walker',
      email: 'walker@pico.co',
      jobTitle: 'Designer',
      department: 'Product',
      status: 'Removed',
    },
  ];

  const pageSize = 5;
  const [page, setPage] = React.useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const paged = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableCell isHeader className="py-3">
                Description
              </TableCell>
              <TableCell isHeader className="py-3">
                Job Title
              </TableCell>
              <TableCell isHeader className="py-3">
                Department
              </TableCell>
              <TableCell isHeader className="py-3">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 text-right">
                <span className="sr-only">Actions</span>
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="border-t-1 border-[#202124] rounded-lg  ">
            {paged.map((u) => (
              <TableRow
                key={u.id}
                className="border-t-1 border-[#202124] rounded-lg "
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <AvatarText name={u.name} className="h-9 w-9" />
                    <div className="min-w-0">
                      <div className="text-white-100 text-sm font-normal truncate">
                        {u.name}
                      </div>
                      <div className="text-[#737373] text-[10px] truncate">
                        {u.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-white-100 text-sm font-normal">
                  {u.jobTitle}
                </TableCell>
                <TableCell className="text-white-100 text-sm font-normal">
                  {u.department}
                </TableCell>
                <TableCell>
                  <StatusPill status={u.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-3">
                    <button
                      type="button"
                      className="text-white/50 hover:text-white/80"
                      aria-label={`Edit ${u.name}`}
                    >
                      <EditIcon />
                    </button>
                    <button type="button" aria-label={`Remove ${u.name}`}>
                      <DeleteIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end m-4">
          <Pagination
            currentPage={page}
            lastPage={pageCount}
            hasPrevPage={page > 1}
            hasNextPage={page < pageCount}
            onPageChange={(nextPage) =>
              setPage(Math.min(pageCount, Math.max(1, nextPage)))
            }
          />
        </div>
      </TableContainer>
      <div className="flex justify-center w-full mt-10">
        <Link
          href={'/onboarding/welcome'}
          className="flex font-general items-center justify-center gap-2 w-full max-w-[320px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <>
            Complete
            <ArrowRight />
          </>
        </Link>
      </div>
    </div>
  );
}
