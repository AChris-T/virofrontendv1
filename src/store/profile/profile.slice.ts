import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  provider?: string;
  profile_picture?: string;
  onboarded?: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload.id;
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
