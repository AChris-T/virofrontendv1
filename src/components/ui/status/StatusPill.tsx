export type UserStatus = 'Active' | 'Invited' | 'Removed';

export default function StatusPill({ status }: { status: UserStatus }) {
  const base =
    'inline-flex items-center justify-center rounded-[4px] px-3 py-1 text-[11px] font-medium';
  if (status === 'Active') {
    return (
      <span
        className={`${base} bg-[#072C28] text-[#0DD9C4] border border-transparent`}
      >
        Active
      </span>
    );
  }
  if (status === 'Invited') {
    return (
      <span className={`${base} bg-white/10 text-white/70 border border-none`}>
        Invited
      </span>
    );
  }
  return (
    <span className={`${base} bg-white/5 text-white/35 border border-none`}>
      Removed
    </span>
  );
}
