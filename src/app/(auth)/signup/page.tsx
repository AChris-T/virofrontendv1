import SignUpForm from '@/components/auth/SignUpForm';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Signup',
  url: '/signup',
  description: 'Create a new Viro ',
});

export default function SignUp() {
  return <SignUpForm />;
}
