import ResetPassword from '@/components/auth/ResetPassword';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Reset Password',
});

export default async function Page() {
  return <ResetPassword />;
}
