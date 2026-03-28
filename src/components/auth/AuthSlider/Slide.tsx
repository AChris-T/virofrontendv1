'use client';
import {
  CameraIcon,
  CloseIcon,
  CompetitorsIcon,
  FactIcon,
  KeyboardIcon,
  ListIcon,
  QuestionIcon,
  RecapIcon,
  SendIcon,
  StarIcon,
  SuperStartIcon,
  ViroCircleIcon,
  ZoomIcon,
  MailIcon,
  SummaryIcon,
} from '@/assets/icons';
import Toggle from '@/components/ui/Toggle/Toggle';
import React, { useEffect, useState } from 'react';

export default function Slide() {
  const [state, setState] = useState({
    assignAgent: false,
    activeIndex: 0,
    isPaused: false,
    typedText: '',
  });
  const { activeIndex, isPaused, typedText, assignAgent } = state;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const WORDS = [
    'I want to know if...',
    'Can you explain...',
    'How do I fix...',
  ];
  const SLIDES_COUNT = 3;

  useEffect(() => {
    if (isPaused) return;

    const id = window.setInterval(() => {
      setState((prev) => ({
        ...prev,
        activeIndex: (prev.activeIndex + 1) % SLIDES_COUNT,
      }));
    }, 7000);

    return () => window.clearInterval(id);
  }, [isPaused]);

  // Typewriter effect for Slide 2 input text (no user typing).
  useEffect(() => {
    if (activeIndex !== 1) {
      setState((prev) => ({ ...prev, typedText: '' }));
      return;
    }

    // Slower typing for a calmer "auto type" feel.
    const typingSpeedMs = 75;
    const pauseAfterWordMs = 900;
    const pauseBetweenWordsMs = 250;

    setState((prev) => ({ ...prev, typedText: '' }));

    let cancelled = false;
    let timeoutId: number | undefined;

    let wordIndex = 0;
    let charIndex = 0;

    const tick = () => {
      if (cancelled) return;

      const currentWord = WORDS[wordIndex] ?? '';
      charIndex += 1;
      setState((prev) => ({
        ...prev,
        typedText: currentWord.slice(0, charIndex),
      }));

      if (charIndex >= currentWord.length) {
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          wordIndex = (wordIndex + 1) % WORDS.length;
          charIndex = 0;
          setState((prev) => ({ ...prev, typedText: '' }));
          timeoutId = window.setTimeout(tick, pauseBetweenWordsMs);
        }, pauseAfterWordMs);
        return;
      }

      timeoutId = window.setTimeout(tick, typingSpeedMs);
    };

    timeoutId = window.setTimeout(tick, typingSpeedMs);

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [activeIndex]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setState((prev) => ({ ...prev, isPaused: true }))}
      onMouseLeave={() => setState((prev) => ({ ...prev, isPaused: false }))}
    >
      {/* Slide 1 */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-9 text-white z-10 transition-shadow duration-300 ${
          activeIndex === 0
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 authbg" />
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="glassEffect glass flex flex-col gap-4 w-[400px] p-4 border-[#ffffff94] border rounded-3xl ">
          <div className="flex justify-between items-center">
            <div className="glassEffect  p-2 border-[#ffffff94]  border rounded-lg">
              <CameraIcon />
            </div>
            <CloseIcon className="cursor-pointer opacity-80" />
          </div>
          <h3 className="font-general leading-4 font-light text-sm text-white">
            You are t-minus 30mins till your next meeting
          </h3>
          <div className="flex flex-col  border-[#ffffff94] border-[0.67px] rounded-lg ">
            <div className="p-3 flex justify-between items-center">
              <div className="flex gap-2 items-center font-general font-light">
                <h3 className="text-white text-xs font-medium">Today</h3>
                <span className="bg-white-100 w-1 h-1 rounded-full"></span>
                <h3 className="text-white text-xs font-medium">
                  10:30 PM - 11:30 PM
                </h3>
              </div>
              <div className="bg-[#F8F8F833] flex items-center gap-2 px-2 py-1 rounded-lg">
                <h3 className="text-[11px] font-light ">Assign agent</h3>
                <Toggle
                  checked={assignAgent}
                  onChange={(next: any) =>
                    setState((prev) => ({ ...prev, assignAgent: next }))
                  }
                />
              </div>
            </div>
            <div className="border-t-[0.67px] flex justify-between p-3  border-t-[#ffffff94] rounded-l-lg rounded-r-lg">
              <div className="flex gap-[10px]">
                <div className="bg-[#2696F2] w-[3px] rounded-sm h-10"></div>
                <div>
                  <h3 className="text-sm font-medium font-general text-white">
                    Acme Sales Demo
                  </h3>
                  <h3 className="flex items-center text-white gap-1 font-normal text-[10px] font-general tracking-[0.025em]">
                    <StarIcon /> Sales pitch meeting with Acme sales person
                  </h3>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center border rounded-full px-3 py-2 border-white gap-1 font-medium text-sm bg-transparent"
              >
                <ZoomIcon /> Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-9 text-white z-10 transition-shadow  duration-300 ${
          activeIndex === 1
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 authbg1" />
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="glassEffect glass flex flex-col gap-4 w-[400px] p-4 border-[#ffffff94] border rounded-3xl ">
          <div className="flex flex-col gap-4  px-3 py-3">
            <div className="flex gap-3 items-start max-w-[303px] rounded-tr-[11px] rounded-tl-[14px] rounded-br-[11.3px] border-2 bg-[#B2ABABA3] px-3 py-2.5 border-[#F8F8F833]">
              <h3 className="font-inter font-normal text-sm">
                Does the suggestion works?
              </h3>
            </div>
            <div className="flex items-end justify-end w-full">
              <div className="flex gap-3 items-start max-w-[303px] rounded-tr-[11px] rounded-tl-[14px] rounded-bl-[11.3px] border-2  px-3 py-2.5 border-[#F8F8F833]">
                <h3 className="font-inter font-normal text-sm">
                  That&apos;s awesome. I think our users will really appreciate
                  the improvements.
                </h3>
              </div>
            </div>
          </div>
          <div className="gradient-inputbox   flex gap-2 items-center">
            <KeyboardIcon />
            <input
              className="focus:outline-none w-full font-general font-medium text-sm pointer-events-none select-none bg-transparent"
              value={typedText}
              readOnly
              aria-label="Auto-typed input"
              tabIndex={-1}
              onKeyDown={(e) => e.preventDefault()}
            />
            <button className="customizebutton p-2 rounded-full items-center justify-center flex">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Slide 3 */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-9 text-white z-10 transition-shadow duration-300 ${
          activeIndex === 2
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 authbg2" />
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="glassEffect glass flex flex-col gap-4 w-[430px] p-4 border-[#ffffff94] border rounded-3xl ">
          <div className="flex justify-between items-center">
            <h3 className="font-general text-white">Live Intelligence</h3>
            <ViroCircleIcon />
          </div>
          <div className="grid grid-cols-2  gap-[10px] ">
            <div className="border-2  flex items-center gap-2 bg-[#F8F8F80F] rounded-xl px-3 py-2.5 border-[#F8F8F81A]">
              <SuperStartIcon />
              <h3 className="text-[11px] font-medium font-general">
                What should I say?
              </h3>
            </div>
            <div className="border-2 flex items-center gap-2 bg-[#F8F8F80F] rounded-xl px-3 py-2.5 border-[#F8F8F81A]">
              <QuestionIcon />
              <h3 className="text-[11px] font-medium font-general">
                Follow-up questions
              </h3>
            </div>
            <div className="border-2 flex items-center gap-2 bg-[#F8F8F80F] rounded-xl px-3 py-2.5 border-[#F8F8F81A]">
              <CompetitorsIcon />
              <h3 className="text-[11px] font-medium font-general">
                Check competitors{' '}
              </h3>
            </div>
            <div className="border-2 flex items-center gap-2 bg-[#F8F8F80F] rounded-xl px-3 py-2 border-[#F8F8F81A]">
              <FactIcon />
              <h3 className="text-[11px] font-medium font-general">
                Fact-check statements
              </h3>
            </div>
            <div className="border-2 flex items-center gap-2 bg-[#F8F8F80F] rounded-xl px-3 py-2 border-[#F8F8F81A]">
              <RecapIcon />
              <h3 className="text-[11px] font-medium font-general">
                Quick recap
              </h3>
            </div>
            <div className="border-2 flex items-center gap-2 bg-[#F8F8F80F] rounded-xl px-3 py-2 border-[#F8F8F81A]">
              <ListIcon />
              <h3 className="text-[11px] font-medium font-general">
                Generate action items
              </h3>
            </div>
          </div>
          <div className="border-2 -mt-1 flex items-center gap-2 bg-[#F8F8F80F] rounded-xl px-3 py-2 border-[#F8F8F81A]">
            <MailIcon />
            <h3 className="text-[11px] font-medium font-general">
              Draft a follow-up email for the proposed meeting discussion
            </h3>
          </div>
          <div className="border-2 -mt-1 flex items-center gap-2 bg-[#F8F8F80F] rounded-xl px-3 py-2 border-[#F8F8F81A]">
            <SummaryIcon />
            <h3 className="text-[11px] font-medium font-general">
              Generate executive summary{' '}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
