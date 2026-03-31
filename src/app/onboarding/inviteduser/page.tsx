import { InvitedUserIcon } from '@/assets/icons';
import InviteList from '@/components/dashboard/workspace/inviteusers/InviteList';
import Image from 'next/image';
import Link from 'next/link';

export default function page() {
  return (
    <div className="flex justify-center overflow-y-scroll max-h-[100%] pt-[400px] no-scrollbar pb-20 flex-col items-center space-y-12 w-full min-w-0 overflow-x-hidden">
      <div className="space-y-16 flex flex-col justify-center items-center">
        <Image
          src="/images/Logo.png"
          alt="Viro"
          width={50}
          height={50}
          className="relative z-10"
        />
        <h2 className="text-[28px] text-center text-white font-general">
          You can always add more in settings{' '}
        </h2>
      </div>
      <div className="max-w-[800px] mx-auto space-y-4 font-general text-start w-full min-w-0">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium ">Users</h3>
          <Link
            href={'/onboarding/inviteusers'}
            className="border-[#055A52] flex items-center gap-1 text-[#017E72] font-medium border rounded-full px-3 py-1 text-[13px] "
          >
            <InvitedUserIcon /> invite user
          </Link>
        </div>
        <div className="w-full min-w-0">
          <InviteList />
        </div>
      </div>
    </div>
  );
}
