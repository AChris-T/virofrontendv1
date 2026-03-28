import VerificationEmail from '@/components/auth/VerificationEmail';
import AlertMessage from '@/components/common/AlertMessage';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Email Verification',
});

interface PageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function EmailVerification({ searchParams }: PageProps) {
  const { email } = await searchParams;

  if (!email) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <AlertMessage type="error" message="Email  are required." />
      </div>
    );
  }

  return <VerificationEmail email={email} />;
}
