import React, { useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { ExpectedIcon, PurposeIcon } from '@/assets/icons';

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
  isLoading = false,
  isError = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (isLoading) {
    return <p className="text-sm text-gray-400">Loading meeting details...</p>;
  }

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
      <div className="flex items-center gap-6 overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={twMerge(
              'relative inline-flex items-center gap-2 whitespace-nowrap px-0 py-2.5 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'text-[#9CDD1A]'
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
            <span
              className={twMerge(
                'pointer-events-none absolute -bottom-px left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-all',
                activeTab === tab.value
                  ? 'w-10 bg-[#9CDD1A]'
                  : 'w-0 bg-transparent'
              )}
            />
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="">
            <h3 className="text-sm  text-white mb-3">Meeting Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Purpose Box */}
              <div className="rounded-lg border border-[#404040]  p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#9CDD1A]">
                    <PurposeIcon />
                  </span>
                  <p className="text-sm  text-white">Purpose</p>
                </div>
                <p className="text-sm text-white">
                  {details.description || 'No description provided'}
                </p>
              </div>

              {/* Expected Outcome Box */}
              <div className="rounded-lg border border-[#404040] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#9CDD1A]">
                    <ExpectedIcon />
                  </span>
                  <p className="text-sm text-white  tracking-wide">
                    Meeting Details
                  </p>
                </div>
                <div className="space-y-2 text-sm text-[#B5BDC8]">
                  <p className="text-sm text-white">
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
                <>
                  <p className="text-sm text-[#8C8C8C]">
                    No meeting insight yet.
                  </p>
                  <p className="text-xs text-[#595959]">
                    Insights will be generated after your meeting
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preparation Tab */}
      {activeTab === 'preparation' && (
        <div className="space-y-4">
          {/* Pre-Meeting Analysis */}
          <div>
            <h3 className="text-sm font-medium text-[#E6E9EE] mb-3">
              Key Items To Discuss
            </h3>
            <div className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-4">
              {details.pre_meeting_analysis ? (
                <div className="text-sm text-[#B5BDC8] space-y-2">
                  {details.pre_meeting_analysis.split('\n').map((item, idx) => (
                    <p key={idx}>• {item.trim()}</p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#8C8C8C]">
                  No preparation items available
                </p>
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
        <div className="space-y-4">
          <div>
            <h3 className="text-[13px] text-[#A6A6A6] mb-3">
              <span className="text-base text-white-200 font-medium">
                Participants{' '}
              </span>
              .
              {participants.length > 0
                ? `You & ${participants.length - 1} others`
                : ''}
            </h3>
            <div className="space-y-3">
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
                    <p className="text-xs text-[#737373] truncate">
                      {participant.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre Meeting Brief */}
          <div>
            <h3 className="text-sm font-medium text-[#E6E9EE] mb-3">
              Pre Meeting Brief
            </h3>
            <div className="rounded-lg border border-[#262626] bg-[#0F0F0F] p-4">
              <p className="text-sm text-[#8C8C8C]">
                No pre-meeting brief available
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
