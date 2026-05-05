import React from 'react';

export default function DealOverview() {
  return (
    <div className="space-y-6 pb-24 mt-6">
      {/* Iris summary */}
      <div className="rounded-lg bg-gradient-to-r from-[rgba(60,242,57,0.05)] to-[rgba(221,242,57,0.05)] border border-[#333333] bg-[#1A1A1A] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#A9D80E]" />
          <h3 className="text-sm font-medium text-[#E9E9E9]">Iris</h3>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#A6A6A6]">
          The Thursday call showed genuine intent — Marcus engaged deeply on the
          product fit discussion. However, the pricing objection raised at 83:14
          was never countered, and the rep spoke 61% of the call, above the
          recommended ceiling. Salesforce was mentioned four times without any
          competitive response. The deal is winnable but needs a deliberate
          strategy before today’s call.
        </p>
      </div>

      {/* Upcoming Meetings */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white-100">
          Upcoming Meetings
        </h4>
        <div className="p-2 bg-[#262626] border-[#333333] rounded-lg">
          <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-10 w-1 rounded-full bg-[#5392C5]" />
                  <div className=" flex flex-col">
                    <div className="truncate text-sm font-medium text-[#E9E9E9]">
                      Figma Enterprise - Negotiation
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#A6A6A6]">
                      <span className="rounded-full border border-[#333333] bg-[#171717] px-2 py-0.5">
                        Today
                      </span>
                      <span className="rounded-full border border-[#333333] bg-[#171717] px-2 py-0.5">
                        1:00 PM
                      </span>
                      <span className="rounded-full border border-[#333333] bg-[#171717] px-2 py-0.5">
                        3 attendees
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-lg bg-[#A9D80E] px-4 py-2 text-xs font-semibold text-[#101010] border border-[#5A6D1A]"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[#E9E9E9]">Activity</h4>
        <div className="rounded-lg border border-[#333333] bg-[#262626] p-2">
          <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-4">
            <div className="space-y-3">
              {[
                {
                  text: 'Iris generated Meeting summary for the meeting Viro All Hands Call',
                  time: '3h ago',
                  active: false,
                },
                {
                  text: 'Alex summarized the Project kickoff meeting',
                  time: '2h ago',
                  active: false,
                },
                {
                  text: 'Sam reported on the Design Review session',
                  time: '1h ago',
                  active: false,
                },
                {
                  text: 'Jordan detailed updates from the Marketing Strategy discussion',
                  time: '45m ago',
                  active: false,
                },
                {
                  text: 'Taylor presented notes from the Tech Stack Evaluation',
                  time: '30m ago',
                  active: true,
                },
              ].map((item, idx, arr) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex flex-col items-center mt-1">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.active ? 'bg-[#A9D80E]' : 'bg-[#8C8C8C]'
                      }`}
                    />
                    {idx < arr.length - 1 ? (
                      <span className="h-6 w-[1px] bg-[#333333]" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center  gap-3">
                      <p className="text-sm font-medium text-white truncate">
                        {item.text}
                      </p>
                      <span className="shrink-0 text-[11px] gap-2 text-[#A6A6A6] flex items-center">
                        <div className="w-1 h-1 rounded-full bg-[#404040]" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Context */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[#E9E9E9]">Pinned Context</h4>
        <div className="rounded-lg border border-[#333333] bg-[#262626] p-2">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Card 1 */}
            <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-2">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md bg-[#3A1B1B] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#F34141]">
                  OBJECTION
                </span>
                <span className="text-[11px] text-[#A6A6A6]">Nov 28</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#A6A6A6]">
                Marcus mentioned the annual pricing feels too steep compared to
                what they currently pay for HubSpot. Wants a monthly breakdown
                before the next call. Did not reject outright — framed as “needs
                justification”.
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 text-[11px] text-[#737373]">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-[#2E2E2E] border border-[#333333]" />
                  <span className="text-[#A6A6A6]">Banjo Adesuyi</span>
                </div>
                <span>Linked to Sep 30 Discovery call</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-2">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md bg-[#2F2609] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#F79009]">
                  COMPETITOR INTEL
                </span>
                <span className="text-[11px] text-[#A6A6A6]">Nov 28</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#A6A6A6]">
                Marcus confirmed evaluating Salesforce Sales Cloud in parallel.
                No demo committed yet. CFO aware of both evaluations. IT team
                has existing Salesforce integrations — internal preference
                noted.
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 text-[11px] text-[#737373]">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-[#2E2E2E] border border-[#333333]" />
                  <span className="text-[#A6A6A6]">Banjo Adesuyi</span>
                </div>
                <span>Not linked to any activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Qualification */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[#E9E9E9]">Qualification</h4>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="p-2 bg-[#262626] border-[#333333] rounded-lg">
            <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-4">
              {' '}
              <div className="text-[10px] font-semibold tracking-wide text-[#737373]">
                BUDGET
              </div>
              <div className="mt-2 inline-flex rounded-md bg-[#162D1E] px-2 py-1 text-[10px] font-semibold text-[#38D47D]">
                CONFIRMED
              </div>
            </div>
          </div>
          <div className="p-2 bg-[#262626] border-[#333333] rounded-lg">
            <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-4">
              {' '}
              <div className="text-[10px] font-semibold tracking-wide text-[#737373]">
                APPROVED
              </div>
              <div className="mt-2 inline-flex rounded-md bg-[#433523] px-2 py-1 text-[10px] font-semibold text-[#F79009]">
                UNCONFIRMED
              </div>
            </div>
          </div>

          <div className="p-2 bg-[#262626] border-[#333333] rounded-lg">
            <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-4">
              {' '}
              <div className="text-[10px] font-semibold tracking-wide text-[#737373]">
                TIMELINE
              </div>
              <div className="mt-2 inline-flex rounded-md bg-[#262626] border border-[#333333] px-2 py-1 text-[10px] font-semibold text-[#A6A6A6]">
                Q4 2026
              </div>
            </div>
          </div>
          <div className="p-2 bg-[#262626] border-[#333333] rounded-lg">
            <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-4">
              {' '}
              <div className="text-[10px] font-semibold tracking-wide text-[#737373]">
                NEED
              </div>
              <div className="mt-2 inline-flex rounded-md bg-[#162D1E] px-2 py-1 text-[10px] font-semibold text-[#38D47D]">
                CONFIRMED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
