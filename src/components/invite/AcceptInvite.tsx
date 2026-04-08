'use client';
import {
  useAcceptInviteMutation,
  useInvitedUserQuery,
} from '@/store/auth/auth.api';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import AcceptSkeletonInvite from '../ui/skeleton/AcceptInviteSkeleton';
import Loader from '../ui/Loader';
import Link from 'next/link';
import useToastify from '@/hooks/useToastify';

export default function AcceptInvite() {
  const { showToast } = useToastify();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading } = useInvitedUserQuery({ id });
  const [AcceptResponse, { isLoading: loading }] = useAcceptInviteMutation();

  const handleJoin = async () => {
    try {
      await AcceptResponse({
        id,
        success: false,
        detail: '',
      }).unwrap();
      showToast('Invite Accepted', 'success');
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      showToast('Failed to accept invitation:', 'error');
    }
  };
  if (isLoading) return <AcceptSkeletonInvite />;

  return (
    <div className="flex items-center justify-center flex-col gap-16">
      <Image
        src="/images/Logo.png"
        alt="Viro"
        width={50}
        height={50}
        className="relative z-10"
      />
      <div className="space-y-5 flex justify-center items-center flex-col">
        <div className="flex items-center flex-col ">
          <h3 className="text-[28px] text-white-200 text-center">
            {data?.inviter?.first_name} invited you to join the Viro Workspace
          </h3>
          <div className="flex items-center gap-3">
            <h3>Workspace</h3>
            <div className="w-[5px] h-[5px] bg-[#617D02] rounded-full"></div>
            <h3>{data?.workspace?.name}</h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            onClick={handleJoin}
            disabled={loading}
            className="flex mt-8 font-general items-center justify-center w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs  disabled:opacity-50 disabled:cursor-not-allowed bg-green-100 "
          >
            {loading ? <Loader /> : 'Join'}
          </button>
          <div className="text-sm flex items-center gap-1">
            <h3>Or</h3>
            <Link href={'/dashboard'} className="underline">
              Create new workspace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
