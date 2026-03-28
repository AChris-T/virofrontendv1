import VerificationEmail from '@/components/auth/VerificationEmail';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Email Verification',
});

export default async function EmailVerification() {
  return <VerificationEmail />;
}
