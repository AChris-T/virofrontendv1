// components/ui/PageTitle.tsx
import { usePathname } from 'next/navigation';

type PageTitleProps = {
  title?: string; // override auto-title if needed
  subtitle?: string; // optional description line
  className?: string;
};

const routeTitles: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard/daily-brief': {
    title: 'Daily Brief',
  },
  '/dashboard': { title: 'Dashboard' },
  '/dashboard/meetings': {
    title: 'Meetings',
  },
  '/dashboard/calendar': {
    title: 'Calendar',
  },
  '/dashboard/agents': { title: 'Agents', subtitle: 'Manage your AI agents' },
  '/dashboard/workflow': {
    title: 'Workflow',
  },
  '/dashboard/pipeline': {
    title: 'Pipeline',
  },
  '/dashboard/inbox': {
    title: 'Inbox',
  },
};

const PageTitle: React.FC<PageTitleProps> = ({ title, className = '' }) => {
  const pathname = usePathname();
  const matched = routeTitles[pathname];

  const displayTitle = title ?? matched?.title ?? 'Dashboard';

  return (
    <div className={`flex flex-col font-general ${className}`}>
      <h1 className="text-white-200 font-medium text-lg leading-tight">
        {displayTitle}
      </h1>
    </div>
  );
};

export default PageTitle;
