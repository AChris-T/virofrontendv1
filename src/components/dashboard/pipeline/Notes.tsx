import {
  CalendarIcon,
  LinksIcon,
  PencilIcon,
  PinIcon,
  TrashIcon,
} from '@/assets/icons';
import React from 'react';

type NoteType = 'OBJECTION' | 'COMPETITOR INTEL';

type NoteItem = {
  type: NoteType;
  date: string;
  content: React.ReactNode;
  author?: { name: string; initials: string };
  linkedTo: string;
};

type NoteData = {
  notes: NoteItem[];
};

function NoteTypeBadge({ type }: { type: NoteType }) {
  const styles =
    type === 'OBJECTION'
      ? { bg: 'bg-[#3A1B1B]', text: 'text-[#F34141]' }
      : { bg: 'bg-[#2F2609]', text: 'text-[#F79009]' };

  return (
    <span
      className={`inline-flex items-center rounded-md px-3 py-1 text-[11px] font-semibold tracking-wide ${styles.bg} ${styles.text}`}
    >
      {type}
    </span>
  );
}

function AuthorChip({ initials, name }: { initials: string; name: string }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#333333] bg-[#2E2E2E] text-[11px] font-semibold text-[#E9E9E9]">
        {initials}
      </span>
      <span className="truncate text-xs text-[#E9E9E9]">{name}</span>
    </div>
  );
}

function EmptyNoteState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg border border-[#333333] bg-[#2E2E2E]">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#404040] bg-[#262626]">
        <PencilIcon />
      </div>
      <p className="mt-3 text-sm font-medium text-[#E9E9E9]">No notes yet</p>
      <p className="mt-1 text-xs text-[#A6A6A6]">
        Add a note to keep track of important details.
      </p>
    </div>
  );
}

export default function Notes({ NoteData }: { NoteData: NoteData }) {
  const hasNotes = NoteData?.notes && NoteData.notes.length > 0;

  return (
    <div className="mt-4 space-y-3">
      {!hasNotes ? (
        <EmptyNoteState />
      ) : (
        NoteData.notes.map((note: NoteItem, idx: number) => (
          <div
            key={`${note.type}-${note.date}-${idx}`}
            className="rounded-lg border border-[#333333] bg-[#2E2E2E]"
          >
            <div className="flex items-center justify-between gap-3 px-5 pt-4">
              <NoteTypeBadge type={note.type} />
              <div className="inline-flex items-center gap-2 rounded-md border border-[#333333] bg-[#262626] px-3 py-1.5 text-xs text-[#A6A6A6]">
                <CalendarIcon />
                {note.date}
              </div>
            </div>

            <div className="px-5 pb-4 pt-3">
              <p className="text-sm leading-relaxed text-[#A6A6A6]">
                {note.content}
              </p>
            </div>

            <div className="border-t border-[#333333]" />

            <div className="flex items-center justify-between gap-3 px-5 py-3">
              <div className="flex items-center gap-6 min-w-0">
                {note.author && (
                  <AuthorChip
                    initials={note.author.initials}
                    name={note.author.name}
                  />
                )}
                <div className="flex items-center gap-2 min-w-0 text-xs text-[#8C8C8C]">
                  <LinksIcon />
                  <span className="truncate">{note.linkedTo}</span>
                </div>
              </div>

              <div className="flex items-center gap-5 text-[#8C8C8C]">
                <button
                  type="button"
                  className="hover:text-[#E9E9E9] transition-colors"
                  aria-label="Edit note"
                >
                  <PencilIcon />
                </button>
                <button
                  type="button"
                  className="hover:text-[#E9E9E9] transition-colors"
                  aria-label="Pin note"
                >
                  <PinIcon />
                </button>
                <button
                  type="button"
                  className="hover:text-[#E9E9E9] transition-colors"
                  aria-label="Delete note"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
