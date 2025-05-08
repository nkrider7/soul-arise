import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { differenceInCalendarDays } from 'date-fns';
import { StatType } from '~/src/config/gameconfig';

interface HabitCounter {
  id: string;
  title: string;
  createdBy: 'system' | 'user';
  statLinked: StatType;
  icons?: string;
  streak: number;
  maxStreak: number;
  lastUpdated: string | null;
  statusToday: 'completed' | 'missed' | 'pending';
}


interface HabitCounterState {
  counters: HabitCounter[];
}

const initialState: HabitCounterState = {
  counters: [
    {
        id: 'nofap-system',
        title: 'No Fap Challenge',
        icons: 'hand-fist',
        createdBy: 'system',
        statLinked: 'stamina', // could also be 'karma'
        streak: 0,
        maxStreak: 0,
        lastUpdated: null,
        statusToday: 'pending',
      },
  ],
};

const habitCounterSlice = createSlice({
  name: 'habitCounter',
  initialState,
  reducers: {
    addUserCounter: (state, action: PayloadAction<{ title: string; statLinked: StatType; icon?: string }>) => {
        const newCounter: HabitCounter = {
          id: uuid.v4() as string,
          title: action.payload.title,
          statLinked: action.payload.statLinked,
          createdBy: 'user',
          streak: 0,
          maxStreak: 0,
          lastUpdated: null,
          statusToday: 'pending',
          icons: action.payload.icon || 'fire',
        };
        state.counters.push(newCounter);
      },
      

    updateDailyStatus: (state, action: PayloadAction<{ id: string; status: 'completed' | 'missed' }>) => {
      const counter = state.counters.find(c => c.id === action.payload.id);
      if (!counter) return;

      const today = new Date().toISOString().split('T')[0];
      const daysSinceUpdate = counter.lastUpdated
        ? differenceInCalendarDays(new Date(today), new Date(counter.lastUpdated))
        : null;

      if (daysSinceUpdate === 0) return; // Already updated today

      counter.statusToday = action.payload.status;
      counter.lastUpdated = today;

      if (action.payload.status === 'completed') {
        counter.streak += 1;
        if (counter.streak > counter.maxStreak) counter.maxStreak = counter.streak;
      } else {
        counter.streak = 0; // Reset streak on miss
      }
    },

    resetDailyStatuses: (state) => {
      const today = new Date().toISOString().split('T')[0];
      state.counters.forEach(counter => {
        if (counter.lastUpdated !== today) {
          counter.statusToday = 'pending';
        }
      });
    },

    deleteUserCounter: (state, action: PayloadAction<string>) => {
      state.counters = state.counters.filter(c => c.id !== action.payload);
    },
  },
});

export const {
  addUserCounter,
  updateDailyStatus,
  resetDailyStatuses,
  deleteUserCounter,
} = habitCounterSlice.actions;

export default habitCounterSlice.reducer;
