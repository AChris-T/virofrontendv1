import ResetPassword from '@/components/auth/ResetPassword';
import AlertMessage from '@/components/common/AlertMessage';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Reset Password',
});

interface PageProps {
  searchParams: Promise<{ token?: string; email?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <AlertMessage
          type="error"
          message="Invalid or missing password reset token or email."
        />
      </div>
    );
  }

  return <ResetPassword token={token} />;
}
