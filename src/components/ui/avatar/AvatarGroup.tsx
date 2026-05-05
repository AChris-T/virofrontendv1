import Image from 'next/image';

interface Avatar {
  src?: string;
  initials?: string;
  alt?: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  max?: number;
  size?: number;
}

export default function AvatarGroup({
  avatars,
  max = 4,
  size = 8,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  const sizeClass = `w-${size} h-${size}`;
  const textSize = size <= 8 ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {visible.map((avatar, i) => (
          <div
            key={i}
            className={`
              ${sizeClass} w-[30px] h-[30px]  rounded-full border-[#333333] border-1
              overflow-hidden flex items-center justify-center
              bg-[#2E2E2E] shrink-0
            `}
            style={{ zIndex: visible.length - i }}
          >
            {avatar.src ? (
              <Image
                src={avatar.src}
                alt={avatar.alt ?? `Avatar ${i + 1}`}
                width={size * 4}
                height={size * 4}
                className="w-full h-full object-cover"
              />
            ) : avatar.initials ? (
              <span
                className={`${textSize} font-medium text-xs
                 text-white tracking-tight`}
              >
                {avatar.initials}
              </span>
            ) : null}
          </div>
        ))}

        {overflow > 0 && (
          <div
            className={`
              ${sizeClass} w-[30px] h-[30px] text-white rounded-full
              bg-[#2E2E2E] border-[#333333] flex items-center justify-center shrink-0
            `}
            style={{ zIndex: 0 }}
          >
            <span
              className={`${textSize} font-medium text-white tracking-tight`}
            >
              {' '}
              {overflow}+
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
