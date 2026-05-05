import { useMemo, useState } from 'react';
import { CheckedIcon, LinkIcon, PinnedIcon } from '@/assets/icons';
import useToastify from '@/hooks/useToastify';
import { useCreateDealNoteMutation } from '@/store/dashboard/dashboard.api';
import Loader from '@/components/ui/Loader';

type CreateNoteProps = {
  dealData?: {
    activities?: { id: string; title?: string | null }[];
  };
  dealId?: string;
  pipelineId?: string;
  workspaceId?: string;
  teamspaceId?: string;
};

const noteTypes = [
  { label: 'GENERAL', color: '#38D47D', bgcolor: '#162D1E' },
  { label: 'OBJECTION', color: '#D7594C', bgcolor: '#2D1F1B' },
  { label: 'RISK', color: '#8D71D9', bgcolor: '#1E1F26' },
  { label: 'COMPETITOR INTEL', color: '#D29437', bgcolor: '#262314' },
  { label: 'NEXT STEPS', color: '#5392C5', bgcolor: '#1A2028' },
];

const initialState = {
  selectedType: 'GENERAL',
  note: '',
  visibility: 'team' as 'team' | 'private',
  isPinned: false,
  isLinking: false,
  selectedActivityId: '',
};

export default function CreateNote({
  dealData,
  dealId,
  pipelineId,
  workspaceId,
  teamspaceId,
}: CreateNoteProps) {
  const [state, setState] = useState(initialState);
  const {
    selectedType,
    note,
    visibility,
    isPinned,
    isLinking,
    selectedActivityId,
  } = state;

  const set = (patch: Partial<typeof initialState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const { showToast } = useToastify();
  const [createDealNote, { isLoading }] = useCreateDealNoteMutation();

  const activityOptions = useMemo(
    () =>
      (dealData?.activities ?? [])
        .filter((a) => Boolean(a?.id))
        .map((a) => ({
          label: a.title?.trim() || 'Untitled activity',
          value: a.id,
        })),
    [dealData?.activities]
  );

  const selectedActivityLabel = useMemo(
    () =>
      activityOptions.find((item) => item.value === selectedActivityId)?.label,
    [activityOptions, selectedActivityId]
  );

  const handleSubmit = async () => {
    if (!workspaceId || !teamspaceId || !pipelineId || !dealId) {
      showToast(
        'Missing deal context. Please reopen this deal and try again.',
        'error'
      );
      return;
    }
    if (!note.trim()) {
      showToast('Please write a note before saving.', 'error');
      return;
    }

    try {
      await createDealNote({
        workspaceid: workspaceId,
        teamspaceid: teamspaceId,
        pipeline_id: pipelineId,
        deal_id: dealId,
        payload: {
          type: selectedType.toLowerCase(),
          note: note.trim(),
          visibility,
          is_pinned: isPinned,
          related_activity_id: selectedActivityId || null,
        },
      }).unwrap();

      showToast('Note saved successfully.', 'success');
      setState(initialState);
    } catch (error: unknown) {
      const err = error as {
        data?: { detail?: string; message?: string; error?: string } | string;
      };
      const data = err?.data;
      const msg =
        typeof data === 'string'
          ? data
          : (data?.detail ??
            data?.message ??
            data?.error ??
            'Failed to save note.');
      showToast(String(msg), 'error');
    }
  };
  const [setNote, isSetNote] = useState(true);
  return (
    <div>
      {setNote ? (
        <div className="flex items-end justify-end">
          <button
            type="button"
            onClick={() => isSetNote(false)}
            className="bg-[#A9D80E] border border-[#5A6D1A] rounded-lg py-2 px-4 text-[#101010] font-medium text-sm disabled:opacity-60"
          >
            Create Note
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-2 flex items-start gap-2 flex-col">
            <h3 className="text-[#A6A6A6] text-sm font-medium">Note Type:</h3>
            <div className="flex gap-2 flex-wrap">
              {noteTypes.map((type) => {
                const isSelected = selectedType === type.label;
                const buttonStyle = {
                  backgroundColor: isSelected ? type.bgcolor : 'transparent',
                  borderColor: type.color,
                  color: type.color,
                };
                return (
                  <button
                    key={type.label}
                    type="button"
                    onClick={() => set({ selectedType: type.label })}
                    style={buttonStyle}
                    className="px-2 py-1 text-xs font-medium rounded border transition-all flex items-center gap-1"
                  >
                    {type.label}
                    {isSelected && <CheckedIcon fill={type.color} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-1 border-5 px-1 border-[#333] bg-[#0F0F0F] rounded-[20px]">
            <div className="relative">
              <textarea
                className="bg-[#2E2E2E] rounded-[18px] w-full px-6 text-[#797B72] font-medium py-2 focus:outline-none h-[96px] text-start"
                placeholder="Write a note about this deal"
                value={note}
                onChange={(e) => set({ note: e.target.value })}
              />
              <div className="absolute flex items-center gap-2 top-2 right-3">
                {(['team', 'private'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => set({ visibility: v })}
                    className={`text-xs font-medium rounded p-1 border ${
                      visibility === v
                        ? 'bg-[#262626] text-[#F8F8F8] border-[#333333]'
                        : 'bg-transparent text-[#797B72] border-[#333333]'
                    }`}
                  >
                    {v === 'team' ? 'Team' : 'Only me'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 px-3 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-4 relative">
                <button
                  type="button"
                  onClick={() => set({ isLinking: !isLinking })}
                  className={`text-xs flex items-center justify-center py-2 px-3 bg-[#262626] rounded-full border border-[#333333] ${
                    selectedActivityLabel
                      ? 'text-[#D9D9D9] max-w-[220px] truncate'
                      : 'text-[#8C8C8C] gap-2 w-[65px]'
                  }`}
                >
                  {selectedActivityLabel ? (
                    <span className="truncate">{selectedActivityLabel}</span>
                  ) : (
                    <>
                      <LinkIcon />
                      Link
                    </>
                  )}
                </button>

                {isLinking && (
                  <div className="absolute bottom-10 left-0 z-50 w-[280px] max-h-[220px] overflow-y-auto rounded-[8px] border border-[#333333] bg-[#262626] shadow-xl">
                    {activityOptions.length > 0 ? (
                      activityOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            set({
                              selectedActivityId: option.value,
                              isLinking: false,
                            })
                          }
                          className={`block w-full px-3 py-2 text-left text-xs border-b border-[#333333] last:border-b-0 ${
                            selectedActivityId === option.value
                              ? 'text-white bg-[#303030]'
                              : 'text-[#BFBFBF] hover:bg-[#2E2E2E]'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-[#8C8C8C]">
                        No activities available
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => set({ isPinned: !isPinned })}
                  className={`text-xs flex gap-2 items-center justify-center px-3 py-2 rounded-full border ${
                    isPinned
                      ? 'bg-[#162D1E] text-[#38D47D] border-[#38D47D66]'
                      : 'bg-[#262626] text-[#8C8C8C] border-[#333333]'
                  }`}
                >
                  <PinnedIcon />
                </button>
              </div>

              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={isLoading}
                className="bg-[#A9D80E] border border-[#5A6D1A] rounded-lg py-2 px-4 text-[#101010] font-medium text-sm disabled:opacity-60"
              >
                {isLoading ? <Loader /> : 'Save note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
