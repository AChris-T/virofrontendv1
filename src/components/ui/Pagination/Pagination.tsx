import {
  ArrowLeftPaginationIcon,
  ArrowRightPaginationIcon,
} from '@/assets/icons';

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        aria-label="Previous page"
        className="h-[28px] w-[28px]  rounded-[6px] bg-[#202124] border border-none text-white/70 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5 transition-colors flex items-center justify-center"
      >
        <ArrowRightPaginationIcon />{' '}
      </button>

      <span
        className="h-[28px] w-[28px] px-5 rounded-[6px] bg-[#072C28] text-white font-general text-lg flex items-center justify-center"
        aria-label={`Page ${currentPage} of ${lastPage}`}
      >
        {currentPage}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        aria-label="Next page"
        className="h-[28px] w-[28px] rounded-[6px] bg-[#202124] border border-none text-white/70 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5 transition-colors flex items-center justify-center"
      >
        <ArrowLeftPaginationIcon />{' '}
      </button>
    </div>
  );
}
