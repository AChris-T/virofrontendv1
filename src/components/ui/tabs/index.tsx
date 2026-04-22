'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type Tab = {
  label: string;
  icon?: React.ReactNode | ((isActive: boolean) => React.ReactNode);
  value: string;
};

type TabsProps = {
  tabs: Tab[];
  defaultValue?: string;
  paramKey?: string;
  onChange?: (value: string) => void;
};

export function Tabs({
  tabs,
  defaultValue,
  paramKey = 'tab',
  onChange,
}: TabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active = searchParams.get(paramKey) ?? defaultValue ?? tabs[0]?.value;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    onChange?.(value);
  };

  return (
    <div className="flex items-center bg-[#0F0F0F] py-1 rounded-[10px]   gap-4">
      {tabs.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => handleChange(tab.value)}
            className="relative flex items-center gap-1.5  text-base transition-colors"
          >
            {/* Icon — pass isActive so icon can change color itself */}
            {/*    {tab.icon && (
              <span className="w-4 h-4 flex items-center justify-center">
                {typeof tab.icon === 'function' ? tab.icon(isActive) : tab.icon}
              </span>
            )} */}

            {/* Gradient text when active, muted when not */}
            <span
              className={
                isActive
                  ? 'bg-[#363636] rounded-lg text-[#FDFDFD] text-sm px-4 py-2  font-medium'
                  : 'text-[#A6A6A6] hover:text-[#A6A6A6] mx-3 text-sm'
              }
            >
              {tab.label}
            </span>

            {/* Active underline */}
            {/*    {isActive && (
              <span className="absolute left-1/2 -translate-x-1/2  -bottom-3.5 w-[32px] h-[2px] bg-[linear-gradient(90deg,#3CF239,#DDF239)] rounded-tr-[4px] rounded-tl-[4px]" />
            )} */}
          </button>
        );
      })}
    </div>
  );
}
