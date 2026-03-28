import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Dashboard - Home',
  description: 'Dashboard - Viro',
  url: '/dashboard',
});

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-6">
      Dashboard{' '}
      <Link
        href="/signin"
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
      >
        Back to Home Page
      </Link>
    </div>
  );
}
