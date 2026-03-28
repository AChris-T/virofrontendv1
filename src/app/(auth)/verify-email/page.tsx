import ResendVerificationEmail from '@/components/auth/ResendEmailVerification';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Verify Email',
});

export default async function Page() {
  return <ResendVerificationEmail />;
}
