// src/redux/slices/settingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  soundEnabled: boolean;
  musicEnabled: boolean;
}

const initialState: SettingsState = {
  soundEnabled: true,
  musicEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSound(state) {
      state.soundEnabled = !state.soundEnabled;
    },
    toggleMusic(state) {
      state.musicEnabled = !state.musicEnabled;
    },
  },
});
export const { toggleSound } = settingsSlice.actions;
export default settingsSlice.reducer;
