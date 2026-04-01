import ComingSoon from '@/components/common/ComingSoon';
import { HeaderSlot } from '@/layout/dashboard/Header';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Dashboard - Home',
  description: 'Dashboard - Viro',
  url: '/dashboard',
});

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-6">
      <HeaderSlot>
        <div className="flex items-center gap-3">
          <button className="border border-[#202124] text-white/70 text-sm px-4 py-2 rounded-lg">
            Import
          </button>
          <button className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg">
            New Item
          </button>
        </div>
      </HeaderSlot>
      Dashboard <ComingSoon />
    </div>
  );
}
