import { CheckCircleIcon, XCircleIcon } from '@/assets/icons';
import React from 'react';

export default function IrisCoaching() {
  const summary =
    'The Thursday call showed genuine intent — Marcus engaged deeply on the product fit discussion. However, the pricing objection raised at 38:14 was never countered, and the rep spoke 61% of the call, above the recommended ceiling. Salesforce was mentioned four times without any competitive response. The deal is winnable but needs a deliberate strategy before today’s call.';

  const whatWentWrong = [
    {
      text: 'Pricing objection at 38:14 — “your annual pricing is too steep” — left completely unaddressed. No ROI counter, no alternative structure offered.',
      meta: '38:14',
    },
    {
      text: 'Salesforce mentioned 4× across the call. Zero competitive response from the rep. No differentiation surfaced when the prospect referenced competitor features.',
      meta: '×4',
    },
    {
      text: 'Rep talk-time at 61% — above the 55% ceiling. Multiple moments where the prospect started to speak and was talked over.',
      meta: '61%',
    },
    {
      text: 'CFO involvement never confirmed. Marcus said “I’ll need to run this by the team” — decision-maker authority is still unverified at this stage.',
      meta: 'Auth',
    },
  ];

  const howToHandle = [
    'Open with the Q1 ROI estimate: $18K/quarter savings based on their disclosed headcount and current process time. Lead with value before any pricing discussion.',
    'When Salesforce comes up — and it will — use the data portability and onboarding speed comparison. Viro deploys in 2 weeks vs Salesforce’s 3–6 month implementation.',
    'Ask directly: “Who else needs to be involved in the final decision?” — this surfaces CFO involvement without pressure and gives you a map of the buying committee.',
    'Do not concede on annual pricing before you have a confirmed implementation timeline from them. Exit with a specific next step, owner, and date — not another vague “we’ll think about it.”',
  ];

  return (
    <div className="space-y-6 mt-4">
      {/* Iris summary */}
      <div className="rounded-lg bg-gradient-to-r from-[rgba(60,242,57,0.05)] to-[rgba(221,242,57,0.05)] border border-[#333333] bg-[#1A1A1A] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#A9D80E]" />
          <h3 className="text-sm font-medium text-[#E9E9E9]">Iris</h3>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#A6A6A6]">{summary}</p>
      </div>

      {/* What Went Wrong */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[#BFBFBF]">What Went Wrong</h4>
        <div className="space-y-2 bg-[#262626] rounded-lg p-2 border-[#333333]">
          {whatWentWrong.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#333333] bg-[#242424] px-4 py-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 text-[#F34141]">
                    <XCircleIcon />
                  </span>
                  <p className="min-w-0 text-xs leading-relaxed text-[#A6A6A6]">
                    {item.text}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-[#8C8C8C]">
                  {item.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How To Handle It Today */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[#BFBFBF]">
          How To Handle It Today
        </h4>
        <div className="space-y-2">
          {howToHandle.map((text, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#333333] bg-[#262626] px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <CheckCircleIcon />
                <p className="text-xs leading-relaxed text-[#A6A6A6]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
