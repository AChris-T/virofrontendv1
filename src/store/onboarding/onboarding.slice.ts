import { createSlice } from '@reduxjs/toolkit';

interface State {
  step: number;
  role: string | null;
  useCases: string[];
  calendarProvider: string | null;
  connectedPlatforms: string[];
  emailNotification: string | null;
  dailyBriefing: string | null;
}

const initialState: State = {
  step: 1,
  role: null,
  useCases: [],
  calendarProvider: null,
  connectedPlatforms: [],
  emailNotification: null,
  dailyBriefing: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    toggleUseCase: (state, action) => {
      const value = action.payload;
      if (state.useCases.includes(value)) {
        state.useCases = state.useCases.filter((v) => v !== value);
      } else {
        if (state.useCases.length < 3) {
          state.useCases.push(value);
        }
      }
    },
    setEmailNotification: (state, action) => {
      state.emailNotification = action.payload;
    },
    setDailyBriefing: (state, action) => {
      state.dailyBriefing = action.payload;
    },
    setCalendarProvider: (state, action) => {
      state.calendarProvider = action.payload;
    },
    toggleConnectedPlatform: (state, action) => {
      const value = action.payload as string;
      if (state.connectedPlatforms.includes(value)) {
        state.connectedPlatforms = state.connectedPlatforms.filter(
          (v) => v !== value
        );
      } else {
        state.connectedPlatforms.push(value);
      }
    },
  },
});

export const {
  nextStep,
  prevStep,
  setRole,
  toggleUseCase,
  setEmailNotification,
  setDailyBriefing,
  setCalendarProvider,
  toggleConnectedPlatform,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
