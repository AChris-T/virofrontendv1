import ProfileHeader from '@/components/dashboard/profile/ProfileHeader';
import ProfileTabContent from '../../../components/dashboard/profile/ProfileContentTab';

export default function ProfilePage() {
  return (
    <div>
      <div className="py-10 px-1">
        <ProfileHeader />
        <ProfileTabContent />
      </div>
    </div>
  );
}
