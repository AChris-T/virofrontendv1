import {
  AddIcon,
  ClockIcon,
  CreateCalenderIcon,
  //GlobeIcon,
  GoogleMeetIcon,
  JoinMeetingIcon,
  MeetingIcon,
  MessageIcon,
  RefreshIcon,
  TeamsMeetingIcon,
  VideoIcon,
  ZoomIcon,
} from '@/assets/icons';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Input } from '@/components/form/Input';
import { Select } from '@/components/form/Select';
import { DatePicker } from '@/components/ui/datepicker';
import { TimePicker } from '@/components/ui/timepicker';
import { duration } from '@/utils/data';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useCreateMeetingEventMutation } from '@/store/dashboard/dashboard.api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Participant = {
  id: string;
  name: string;
  email: string;
  isYou?: boolean;
};

type FormData = {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  meeting_platform: string;
  email: string;
  duration: string;
  frequency: string;
  interval: number;
  count: number;
  until: string;
  by_day: string[];
};

type CreateMeetingProps = {
  onSuccess?: () => void;
};

// const meetingPlatformOptions = [
//   { label: 'Zoom', value: 'zoom' },
//   { label: 'Google Meet', value: 'google_meet' },
//   { label: 'Microsoft Teams', value: 'microsoft_teams' },
// ];

const recurrenceFrequencyOptions = [
  { label: 'Daily', value: 'DAILY' },
  { label: 'Weekly', value: 'WEEKLY' },
  { label: 'Monthly', value: 'MONTHLY' },
  { label: 'Yearly', value: 'YEARLY' },
];

const recurrenceDayOptions = [
  { label: 'Mon', value: 'MO' },
  { label: 'Tue', value: 'TU' },
  { label: 'Wed', value: 'WE' },
  { label: 'Thu', value: 'TH' },
  { label: 'Fri', value: 'FR' },
  { label: 'Sat', value: 'SA' },
  { label: 'Sun', value: 'SU' },
];

const combineDateAndTime = (dateIso: string, time: string) => {
  const date = new Date(dateIso);
  if (Number.isNaN(date.getTime())) return null;

  const [hours, minutes] = time.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

export default function CreateMeeting({ onSuccess }: CreateMeetingProps) {
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const { workspaceId, teamspaceId } = useWorkspace();
  const [createMeeting, { isLoading }] = useCreateMeetingEventMutation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      duration: 'dont-repeat',
      frequency: 'DAILY',
      interval: 1,
      count: 1,
      by_day: [],
      meeting_platform: 'zoom',
    },
  });

  const [participants, setParticipants] = useState<Participant[]>([]);
  const isRepeat = watch('duration') === 'repeat';

  const addParticipantFromEmail = () => {
    const email = (getValues('email') ?? '').trim();
    if (!EMAIL_RE.test(email)) return;
    if (
      participants.some((p) => p.email.toLowerCase() === email.toLowerCase())
    ) {
      return;
    }
    const local = email.split('@')[0] ?? email;
    const name =
      local.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) ||
      email;
    setParticipants((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, email },
    ]);
    setValue('email', '');
  };

  const onSubmit = async (data: FormData) => {
    if (!workspaceId || !teamspaceId) {
      return;
    }

    const typedEmail = data.email?.trim();
    const attendeeEmails = Array.from(
      new Set(
        [
          ...participants.map((participant) => participant.email),
          EMAIL_RE.test(typedEmail) ? typedEmail : '',
        ]
          .map((email) => email.trim())
          .filter(Boolean)
      )
    );

    if (attendeeEmails.length === 0) {
      setError('email', {
        type: 'manual',
        message: 'Add at least one attendee email',
      });
      return;
    }

    const startIso = combineDateAndTime(data.date, data.startTime);
    const endIso = combineDateAndTime(data.date, data.endTime);

    if (!startIso || !endIso) {
      setError('startTime', {
        type: 'manual',
        message: 'Select valid start and end time',
      });
      return;
    }

    if (new Date(endIso) <= new Date(startIso)) {
      setError('endTime', {
        type: 'manual',
        message: 'End time must be after start time',
      });
      return;
    }

    const payload: {
      meeting_platform: string;
      title: string;
      description: string;
      start_time: string;
      end_time: string;
      attendees: string[];
      recurrence?: {
        frequency: string;
        interval: number;
        count: number;
        until: string;
        by_day: string[];
      };
    } = {
      meeting_platform: data.meeting_platform,
      title: data.title,
      description: data.description,
      start_time: startIso,
      end_time: endIso,
      attendees: attendeeEmails,
    };

    if (isRepeat) {
      const untilIso = combineDateAndTime(data.until || data.date, data.endTime);
      if (!untilIso) {
        setError('until', {
          type: 'manual',
          message: 'Select a valid repeat end date',
        });
        return;
      }

      payload.recurrence = {
        frequency: data.frequency,
        interval: Number(data.interval) || 1,
        count: Number(data.count) || 1,
        until: untilIso,
        by_day: data.by_day ?? [],
      };
    }

    await createMeeting({
      workspaceid: workspaceId,
      teamspaceid: teamspaceId,
      payload,
    }).unwrap();

    reset({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      meeting_platform: 'zoom',
      email: '',
      duration: 'dont-repeat',
      frequency: 'DAILY',
      interval: 1,
      count: 1,
      until: '',
      by_day: [],
    });
    setParticipants([]);
    setSelectedLink(null);
    onSuccess?.();
  };

  const toggleLink = (link: string) => {
    setSelectedLink((prev) => (prev === link ? null : link));
    const platformMap: Record<string, string> = {
      googleMeet: 'google_meet',
      zoom: 'zoom',
      teams: 'microsoft_teams',
    };

    const mappedPlatform = platformMap[link];
    if (mappedPlatform) {
      setValue('meeting_platform', mappedPlatform, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        className="h-[55px] py-3.5 font-general font-medium text-xl text-[#737373]"
        placeholder="Add Title"
        type="text"
        error={errors.title}
        {...register('title', { required: 'title is required' })}
      />
      <div className="flex items-center gap-2">
        <CreateCalenderIcon />
        <Controller
          name="date"
          control={control}
          rules={{ required: 'Date is required' }}
          render={({ field }) => (
            <DatePicker
              {...field}
              className="h-[55px] py-2"
              error={errors.date}
              placeholder="Thursday, September 18, 2025"
            />
          )}
        />
      </div>
      <div className="flex items-center gap-2">
        <ClockIcon />
        <div className="flex">
          <Controller
            name="startTime"
            control={control}
            rules={{ required: 'Time is required' }}
            render={({ field }) => (
              <TimePicker
                {...field}
                className="h-[55px] py-2 no-scrollbar"
                error={errors.startTime}
                placeholder="09:30 AM"
              />
            )}
          />
          <div className="flex justify-center items-center px-4">
            <div className="px-1 flex items-center w-3 h-0.5 justify-center bg-[#404040]" />
          </div>
          <Controller
            name="endTime"
            control={control}
            rules={{ required: 'Time is required' }}
            render={({ field }) => (
              <TimePicker
                {...field}
                className="h-[55px] py-2 no-scrollbar"
                error={errors.endTime}
                placeholder="09:30 AM"
              />
            )}
          />
        </div>
      </div>
      {/* <div className="flex items-center gap-2">
        <GlobeIcon />
        <Controller
          name="meeting_platform"
          control={control}
          rules={{ required: 'Please select a platform' }}
          render={({ field }) => (
            <Select
              {...field}
              options={meetingPlatformOptions}
              placeholder="Select meeting platform"
              error={errors.meeting_platform}
              className="h-[55px]"
            />
          )}
        />
      </div> */}
      <div className="flex items-center gap-2">
        <RefreshIcon />
        <Controller
          name="duration"
          control={control}
          rules={{ required: 'Please select a duration' }}
          render={({ field }) => (
            <Select
              {...field}
              options={duration}
              placeholder="Select a duration"
              error={errors.duration}
              className="h-[55px]"
            />
          )}
        />
      </div>
      {isRepeat && (
        <div className="grid grid-cols-1 gap-3 pl-8 md:grid-cols-2">
          <Controller
            name="frequency"
            control={control}
            rules={{ required: 'Please select frequency' }}
            render={({ field }) => (
              <Select
                {...field}
                options={recurrenceFrequencyOptions}
                placeholder="Recurrence frequency"
                error={errors.frequency}
                className="h-[55px]"
              />
            )}
          />

          <Input
            type="number"
            min={1}
            className="h-[55px] py-3.5 font-general text-base text-[#D9D9D9]"
            placeholder="Interval"
            error={errors.interval as any}
            {...register('interval', {
              required: 'Interval is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Interval must be at least 1' },
            })}
          />

          <Input
            type="number"
            min={1}
            className="h-[55px] py-3.5 font-general text-base text-[#D9D9D9]"
            placeholder="Occurrences count"
            error={errors.count as any}
            {...register('count', {
              required: 'Count is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Count must be at least 1' },
            })}
          />

          <Controller
            name="until"
            control={control}
            rules={{ required: 'Repeat end date is required' }}
            render={({ field }) => (
              <DatePicker
                {...field}
                className="h-[55px] pr-20 py-2"
                error={errors.until as any}
                placeholder="Repeat until"
              />
            )}
          />

          <div className="md:col-span-2">
            <p className="mb-2 text-sm text-[#A6A6A6]">Repeat on</p>
            <div className="flex flex-wrap gap-2">
              {recurrenceDayOptions.map((day) => {
                const selectedDays = watch('by_day') || [];
                const checked = selectedDays.includes(day.value);
                return (
                  <label
                    key={day.value}
                    className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-all ${
                      checked
                        ? 'inputgradients border-none text-white'
                        : 'border-[#333333] text-[#A6A6A6] hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={day.value}
                      className="hidden"
                      {...register('by_day')}
                    />
                    {day.label}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <VideoIcon />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => toggleLink('googleMeet')}
            className={`flex items-center text-sm px-3 py-2 gap-2 rounded-lg border transition-all
              ${
                selectedLink === 'googleMeet'
                  ? 'inputgradients border-none text-white'
                  : 'border-[#333333] text-[#A6A6A6] hover:border-white/20'
              }
            `}
          >
            <GoogleMeetIcon />
            Add Google Meet Link
          </button>
          <button
            type="button"
            onClick={() => toggleLink('zoom')}
            className={`flex items-center text-sm px-3 py-2 gap-2 rounded-lg border transition-all
              ${
                selectedLink === 'zoom'
                  ? 'inputgradients border-none text-white'
                  : 'border-[#333333] text-[#A6A6A6] hover:border-white/20'
              }
            `}
          >
            <ZoomIcon />
            Add Zoom Link
          </button>
          <button
            type="button"
            onClick={() => toggleLink('teams')}
            className={`flex items-center text-sm px-3 py-2 gap-2 rounded-lg border transition-all
              ${
                selectedLink === 'teams'
                  ? 'inputgradients border-none text-white'
                  : 'border-[#333333] text-[#A6A6A6] hover:border-white/20'
              }
            `}
          >
            <TeamsMeetingIcon />
            Add Microsoft Teams Link
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center gap-3 w-full">
          <MeetingIcon
            width="24"
            height="24"
            className="shrink-0 text-[#666666]"
          />
          <div className="flex min-h-[52px] flex-1 items-center gap-2 rounded-[10px] gradient-border px-4 py-2.5">
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter email"
              className="min-w-0 flex-1 bg-transparent font-general  text-white placeholder:text-[#666666] focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addParticipantFromEmail();
                }
              }}
              {...register('email', {
                validate: (value) => {
                  const t = (value ?? '').trim();
                  if (participants.length > 0 && !t) return true;
                  if (!t) return 'email is required';
                  if (!EMAIL_RE.test(t)) return 'Enter a valid email';
                  return true;
                },
              })}
            />
            <button
              type="button"
              onClick={addParticipantFromEmail}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full  gradient-border text-[#6f9003] transition-colors hover:bg-white/[0.04]"
              aria-label="Add participant"
            >
              <AddIcon />
            </button>
          </div>
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs -mt-1 pl-9">
            {errors.email.message}
          </p>
        )}
        {participants.length > 0 && (
          <ul className="flex flex-col gap-3 pl-9">
            {participants.map((p) => (
              <li key={p.id} className="flex items-center gap-3 text-sm">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] text-xs font-medium text-white"
                  aria-hidden
                >
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 truncate font-general">
                  <span className="text-white">{p.name}</span>
                  {p.isYou && <span className="text-[#666666]"> (You)</span>}
                  <span className="text-[#666666]"> • </span>
                  <span className="text-white">{p.email}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setParticipants((prev) => prev.filter((x) => x.id !== p.id))
                  }
                  className="shrink-0 p-1 text-[#B33A3A] hover:text-[#d65555]"
                  aria-label={`Remove ${p.email}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="text-white flex gap-3">
          <MessageIcon />
          <div className="gradient-border rounded-lg w-full p-2">
            <textarea
              rows={5}
              placeholder="Add meeting description"
              className="w-full h-full bg-transparent text-white placeholder:text-[#666666] focus:outline-none"
              {...register('description', {
                required: 'Description is required',
              })}
            />
          </div>
        </div>
        {errors.description && (
          <p className="text-red-400 text-xs -mt-1 pl-9">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="mx-10 mt-4">
        <button
          className="flex font-general items-center cursor-pointer justify-center gap-2 w-[170px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          <span className="mt-1">
            <JoinMeetingIcon />
          </span>
          {isLoading ? 'Creating...' : 'Create meeting'}
        </button>{' '}
      </div>
    </form>
  );
}
