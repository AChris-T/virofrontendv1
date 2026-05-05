'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/form/Input';
import { useCreatePipelineMutation } from '@/store/dashboard/dashboard.api';
import type {
  CreatePipelinePayload,
  PipelineStageDefinition,
  PipelineStagesResponse,
} from '@/components/types';
import Loader from '@/components/ui/Loader';
import useToastify from '@/hooks/useToastify';

type CreatePipeProps = {
  data?: PipelineStagesResponse;
  workspaceId?: string | null;
  teamspaceId?: string | null;
};

type FormData = {
  name: string;
};

const steps = ['Pipeline Name', 'Stages'];

export default function CreatePipe({
  data,
  workspaceId,
  teamspaceId,
}: CreatePipeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStageKeys, setSelectedStageKeys] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState('');
  const { showToast } = useToastify();
  const [createPipeline, { isLoading: creatingPipeline }] =
    useCreatePipelineMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
    },
  });

  const groupedStages = useMemo<PipelineStagesResponse>(() => {
    if (!data || typeof data !== 'object') return {};
    return data;
  }, [data]);

  const selectedStages = useMemo(() => {
    const allStages = Object.values(groupedStages).flat();
    return allStages.filter((stage) => selectedStageKeys.includes(stage.key));
  }, [groupedStages, selectedStageKeys]);

  const toggleStage = (stageKey: string) => {
    setSelectedStageKeys((prev) =>
      prev.includes(stageKey)
        ? prev.filter((item) => item !== stageKey)
        : [...prev, stageKey]
    );
  };

  const goNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (values: FormData) => {
    if (currentStep !== 1) return;
    if (!values.name?.trim()) {
      setSubmitError('Pipeline name is required before submission.');
      return;
    }
    if (!workspaceId || !teamspaceId) {
      setSubmitError('Workspace or teamspace is missing.');
      return;
    }
    if (selectedStages.length === 0) {
      setSubmitError('Select at least one stage before submission.');
      return;
    }

    const payload: CreatePipelinePayload = {
      name: values.name.trim(),
      stages: selectedStages.map((stage) => stage.key),
      stages_labels: selectedStages.reduce<Record<string, string>>(
        (acc, stage) => {
          acc[stage.key] = stage.label;
          return acc;
        },
        {}
      ),
      stages_descriptions: selectedStages.reduce<Record<string, string>>(
        (acc, stage) => {
          acc[stage.key] = stage.description ?? '';
          return acc;
        },
        {}
      ),
    };

    try {
      setSubmitError('');
      await createPipeline({
        workspaceid: workspaceId,
        teamspaceid: teamspaceId,
        payload,
      }).unwrap();
      showToast('Pipeline created successfully.', 'success');
    } catch (error: any) {
      setSubmitError('Failed to create pipeline. Please try again.');
      showToast(
        error?.data?.error ?? 'Failed to create pipeline. Please try again.',
        'error'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && currentStep !== 1) {
          e.preventDefault();
        }
      }}
      className="flex flex-col gap-4 p-3"
    >
      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const active = index === currentStep;
          const completed = index < currentStep;

          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium ${
                  active
                    ? 'bg-[#A9D80E] text-[#101010]'
                    : completed
                      ? 'bg-[#1F2B0C] text-[#A9D80E]'
                      : 'bg-[#262626] text-[#797B72]'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs ${
                  active
                    ? 'text-white'
                    : completed
                      ? 'text-[#A9D80E]'
                      : 'text-[#797B72]'
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className="w-6 h-px bg-[#333333]" />
              )}
            </div>
          );
        })}
      </div>

      {currentStep === 0 && (
        <div className="space-y-2">
          <Input
            className="h-[55px] py-3.5 font-general font-medium text-base text-[#94A3B8]"
            placeholder="Pipeline name"
            type="text"
            error={errors.name}
            {...register('name')}
          />
          <p className="text-xs text-[#797B72]">
            Give your pipeline a clear, team-friendly name.
          </p>
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {Object.keys(groupedStages).length === 0 && (
            <div className="rounded-lg border border-[#333333] bg-[#1a1a1a] p-3 text-sm text-[#797B72]">
              No stages available.
            </div>
          )}

          {Object.entries(groupedStages).map(([category, stages]) => (
            <div
              key={category}
              className="rounded-lg border border-[#333333] bg-[#1a1a1a] p-3"
            >
              <h4 className="text-sm capitalize text-white mb-2">
                {category.replace(/_/g, ' ')}
              </h4>
              <div className="space-y-2">
                {stages.map((stage: PipelineStageDefinition) => {
                  const checked = selectedStageKeys.includes(stage.key);

                  return (
                    <button
                      key={stage.key}
                      type="button"
                      onClick={() => toggleStage(stage.key)}
                      className={`w-full text-left rounded-lg border p-3 transition-all ${
                        checked
                          ? 'bg-[#A9D80E14] border-[#A9D80E66]'
                          : 'bg-[#262626] border-[#333333] hover:border-[#797B72]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-white">
                          {stage.label}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            checked
                              ? 'bg-[#A9D80E] text-[#101010]'
                              : 'bg-[#1f1f1f] text-[#797B72]'
                          }`}
                        >
                          {checked ? 'Selected' : 'Select'}
                        </span>
                      </div>
                      <p className="text-xs text-[#797B72] mt-1">
                        {stage.description || 'No description provided'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {submitError && <p className="text-red-400 text-xs">{submitError}</p>}

      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStep === 0}
          className="bg-transparent border border-[#797B72] text-[#797B72] rounded-lg py-2 px-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>

        <div className="flex items-center gap-2">
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="bg-[#A9D80E] rounded-lg py-2 px-3 text-[#101010] text-sm font-medium"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={creatingPipeline}
              className="bg-[#A9D80E] rounded-lg py-2 px-3 text-[#101010] text-sm font-medium"
            >
              {creatingPipeline ? <Loader /> : 'Submit pipeline'}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
