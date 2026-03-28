import SignInForm from '@/components/auth/SignInForm';
import Loading from '@/components/common/Loading';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Signin',
  description:
    'Sign in to your Viro account to access a community of believers passionately committed to walking in the footsteps of Jesus Christ.',
  url: '/signin',
});

export default function SignIn() {
  return (
    <Suspense fallback={<Loading />}>
      <SignInForm />;
    </Suspense>
  );
}
