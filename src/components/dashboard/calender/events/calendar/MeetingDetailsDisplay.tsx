import React, { useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import {
  ExpectedIcon,
  NoPipelineIcon,
  ProfileBriefIcon,
  PurposeIcons,
  ReportMeetingIcon,
} from '@/assets/icons';

interface Participant {
  id: string;
  display_name: string | null;
  email: string;
  display_picture: string | null;
  is_host: boolean;
}

interface MeetingDetail {
  id?: string;
  organiser_email?: string;
  title?: string;
  description?: string | null;
  meeting_url?: string;
  platform?: string;
  bot_mode?: string;
  status?: string;
  start_time?: string;
  end_time?: string;
  transcript_url?: string | null;
  audio_recording_url?: string | null;
  video_recording_url?: string | null;
  notes?: string | null;
  date_created?: string;
  date_updated?: string;
  participants?: Participant[];
  pre_meeting_analysis?: string | null;
  post_meeting_analysis?: string | null;
  data?: Record<string, unknown>;
  event?: Record<string, unknown>;
}

interface MeetingDetailsDisplayProps {
  details?: MeetingDetail | null;
  isLoading?: boolean;
  isError?: boolean;
}

type TabType = 'overview' | 'preparation' | 'participants';

const MeetingDetailsDisplay: React.FC<MeetingDetailsDisplayProps> = ({
  details,
  isError = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (isError || !details) {
    return (
      <p className="text-sm text-red-400">Unable to load meeting details.</p>
    );
  }

  const participants = (details.participants ?? []) as Participant[];

  const tabs: { label: string; value: TabType; count?: number }[] = [
    { label: 'Overview', value: 'overview' },
    { label: 'Preparation', value: 'preparation' },
    {
      label: 'Participants',
      value: 'participants',
      count: participants.length,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex items-center py-1 bg-[#0F0F0F] rounded-[10px] justify-between gap-6 overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={twMerge(
              'relative inline-flex items-center w-full  justify-center gap-2 whitespace-nowrap px-0 py-2.5 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'text-[#A9D80E] bg-[#363636] rounded-lg'
                : 'text-[#8C8C8C] hover:text-[#B5BDC8]'
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && tab.count > 0 && (
              <span
                className={twMerge(
                  'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-medium',
                  activeTab === tab.value
                    ? 'bg-[#1E2A10] text-[#9CDD1A]'
                    : 'bg-[#232323] text-[#8C8C8C]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4 bg-[#262626] border border-[#333333] rounded-lg p-2">
          <div className="">
            <h3 className="text-sm font-medium text-white-100 mb-3">
              Meeting Overview
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {/* Purpose Box */}
              <div className="rounded-lg bg-[#2E2E2E] border border-[#404040]  p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#9CDD1A]">
                    <PurposeIcons />
                  </span>
                  <p className="text-sm font-medium text-white-100">Purpose</p>
                </div>
                <p className="text-sm font-medium text-white">
                  {details.description || 'No description provided'}
                </p>
              </div>

              {/* Expected Outcome Box */}
              <div className="rounded-lg border bg-[#2E2E2E] border-[#404040] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#9CDD1A]">
                    <ExpectedIcon />
                  </span>
                  <p className="text-sm font-medium text-white-100  tracking-wide">
                    Meeting Details
                  </p>
                </div>
                <div className="space-y-2 text-sm text-[#B5BDC8]">
                  <p className="text-sm font-medium text-white">
                    No Meeting Details Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Insight Section */}
          <div>
            <h3 className="text-sm font-medium text-[#E6E9EE] mb-3">
              Meeting Insight
            </h3>
            <div className="rounded-lg border border-[#404040]  p-6 text-center">
              {details.post_meeting_analysis ? (
                <p className="text-sm text-[#B5BDC8]">
                  {details.post_meeting_analysis}
                </p>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <ReportMeetingIcon />
                  <p className="text-sm font-medium text-[#FDFDFD]">
                    No meeting insight yet.
                  </p>
                  <p className="text-xs font-medium text-[#a6a6a6]">
                    Insights will be generated after your meeting
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preparation Tab */}
      {activeTab === 'preparation' && (
        <div className="space-y-4 bg-[#262626] border border-[#333333] rounded-lg p-2">
          {/* Pre-Meeting Analysis */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white-100 mb-3">
              Pipeline Stage
            </h3>
            <div className="rounded-lg border border-[#333] bg-[#2E2E2E] p-4">
              {details.pre_meeting_analysis ? (
                <div className="text-sm text-[#B5BDC8] space-y-2">
                  {details.pre_meeting_analysis.split('\n').map((item, idx) => (
                    <p key={idx}>• {item.trim()}</p>
                  ))}
                </div>
              ) : (
                <div className="space-y-[17px]">
                  <p className="flex gap-2 font-medium items-center text-white-100">
                    <NoPipelineIcon />
                    Pipeline
                  </p>
                  <p className="text-xs text-[#A6A6A6] font-medium">
                    This lead doesn’t have an existing pipeline deal.{' '}
                  </p>
                </div>
              )}
            </div>
            <div className="rounded-lg border border-[#333] bg-[#2E2E2E] p-4">
              {details.pre_meeting_analysis ? (
                <div className="text-sm text-[#B5BDC8] space-y-2">
                  {details.pre_meeting_analysis.split('\n').map((item, idx) => (
                    <p key={idx}>• {item.trim()}</p>
                  ))}
                </div>
              ) : (
                <div className="space-y-[17px]">
                  <p className="flex gap-2 font-medium items-center text-white-100">
                    <ExpectedIcon />
                    Key Items to discuss
                  </p>
                  <p className="text-xs text-[#A6A6A6] font-medium">
                    No Key Item to Discuss{' '}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          {details.notes && (
            <div>
              <h3 className="text-sm font-medium text-[#E6E9EE] mb-3">Notes</h3>
              <div className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-4">
                <p className="text-sm text-[#B5BDC8]">{details.notes}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Participants Tab */}
      {activeTab === 'participants' && (
        <div className="space-y-4 bg-[#262626] border border-[#333333] rounded-lg p-2">
          <div className="bg-[#2E2E2E] p-2 rounded-lg  max-h-[200px] overflow-y-scroll">
            <div className="">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3  p-3"
                >
                  <div className="flex-shrink-0">
                    {participant.display_picture ? (
                      <Image
                        src={participant.display_picture}
                        alt={participant.display_name || 'Avatar'}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-[#262626] flex items-center justify-center text-xs text-[#8C8C8C]">
                        {(participant.display_name || participant.email)
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#E6E9EE]">
                      {participant.display_name || ''}
                      {participant.is_host && (
                        <span className=" text-xs text-[#737373]">
                          (Organizer)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-white-100 font-medium truncate">
                      {participant.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre Meeting Brief */}
          <div>
            <div className="rounded-lg space-y-3 border border-[#262626] bg-[#2E2E2E] p-4">
              <h3 className="flex items-center gap-2 text-sm font-medium text-white-100">
                <ProfileBriefIcon />
                Profile Brief
              </h3>
              <p className="text-xs text-[#A6A6A6]">
                Click on a participant to view profile brief{' '}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recording Links Section (shown in all tabs) */}
      {(details.transcript_url ||
        details.audio_recording_url ||
        details.video_recording_url) && (
        <div className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-4">
          <p className="text-xs font-medium text-[#8C8C8C] uppercase tracking-wide mb-3">
            Resources
          </p>
          <div className="space-y-2">
            {details.video_recording_url && (
              <a
                href={details.video_recording_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#9CDD1A] hover:underline"
              >
                📹 Video Recording
              </a>
            )}
            {details.audio_recording_url && (
              <a
                href={details.audio_recording_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#9CDD1A] hover:underline"
              >
                🎤 Audio Recording
              </a>
            )}
            {details.transcript_url && (
              <a
                href={details.transcript_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#9CDD1A] hover:underline"
              >
                📄 Transcript
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetailsDisplay;
