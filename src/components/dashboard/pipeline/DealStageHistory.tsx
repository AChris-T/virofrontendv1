import React from 'react';

type StageHistoryRow = {
  from: string;
  to: string;
  daysInStage: string;
  movedBy:
    | { kind: 'user'; name: string; initials: string }
    | { kind: 'iris' }
    | { kind: 'current' };
  date: string;
  isCurrent?: boolean;
};

function UserAvatar({ initials }: { initials: string }) {
  return (
    <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[#333333] bg-[#2E2E2E] text-[10px] font-semibold text-[#E9E9E9]">
      {initials}
    </span>
  );
}

export default function DealStageHistory() {
  const rows: StageHistoryRow[] = [
    {
      from: '-',
      to: 'Lead',
      daysInStage: '-',
      movedBy: { kind: 'user', name: 'Leo', initials: 'L' },
      date: 'Sep 18',
    },
    {
      from: 'Lead',
      to: 'Qualified',
      daysInStage: '6d',
      movedBy: { kind: 'user', name: 'Leo', initials: 'L' },
      date: 'Sep 24',
    },
    {
      from: 'Qualified',
      to: 'Demo',
      daysInStage: '3d',
      movedBy: { kind: 'iris' },
      date: 'Sep 27',
    },
    {
      from: 'Demo',
      to: 'Proposal',
      daysInStage: '2d',
      movedBy: { kind: 'user', name: 'Leo', initials: 'L' },
      date: 'Sep 29',
    },
    {
      from: 'Proposal',
      to: 'Negotiation',
      daysInStage: '3d',
      movedBy: { kind: 'iris' },
      date: 'Oct 8',
    },
    {
      from: 'Negotiation',
      to: 'Negotiation',
      daysInStage: '14d',
      movedBy: { kind: 'current' },
      date: 'Oct 8',
      isCurrent: true,
    },
  ];

  return (
    <div className="rounded-lg border w-full  mt-4 border-[#333333] bg-[#262626] p-2">
      <div className="rounded-lg w-full border border-[#333333] bg-[#2E2E2E]">
        <div className="px-6 py-4 w-full">
          <div className="flex justify-between gap-4 text-[11px] font-semibold tracking-wide text-[#8C8C8C] uppercase">
            <div>From</div>
            <div>To</div>
            <div>Days in stage</div>
            <div>Moved by</div>
            <div className="text-right">Date</div>
          </div>
        </div>

        <div className="border-t border-[#333333]">
          {rows.map((row, idx) => (
            <div
              key={`${row.from}-${row.to}-${row.date}-${idx}`}
              className="px-6 py-5 border-b border-[#333333] last:border-b-0"
            >
              <div className="grid grid-cols-[1.2fr_1.2fr_1fr_1fr_0.8fr] gap-4 items-center">
                <div className="text-sm text-[#8C8C8C]">{row.from}</div>

                <div className="flex items-center gap-2 min-w-0">
                  {row.isCurrent ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2F7BD8]" />
                  ) : null}
                  <div
                    className={`truncate text-sm font-medium ${
                      row.isCurrent ? 'text-[#2F7BD8]' : 'text-[#E9E9E9]'
                    }`}
                  >
                    {row.to}
                  </div>
                </div>

                <div
                  className={`text-sm ${
                    row.isCurrent ? 'text-[#2F7BD8]' : 'text-[#8C8C8C]'
                  }`}
                >
                  {row.daysInStage}
                </div>

                <div className="text-sm text-[#A6A6A6]">
                  {row.movedBy.kind === 'user' ? (
                    <div className="flex items-center gap-2">
                      <UserAvatar initials={row.movedBy.initials} />
                      <span className="text-[#E9E9E9]">{row.movedBy.name}</span>
                    </div>
                  ) : row.movedBy.kind === 'iris' ? (
                    <span className="font-medium text-[#A9D80E] text-center">
                      Iris
                    </span>
                  ) : (
                    <span className="text-[#A6A6A6]">Current</span>
                  )}
                </div>

                <div className="text-right text-sm text-[#8C8C8C]">
                  {row.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
