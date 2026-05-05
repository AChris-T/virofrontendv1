import Pipeline from '@/components/dashboard/pipeline/Pipeline';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Pipeline - Pipeline',
  description: 'Pipeline - Viro',
  url: '/dashboard/pipeline',
});
export default function page() {
  return (
    <div className="text-white">
      <Pipeline />
    </div>
  );
}
