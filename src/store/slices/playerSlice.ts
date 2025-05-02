import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import GAME_CONFIG, { StatType } from '../../config/gameconfig';

interface PlayerState {
  name: string;
  email: string;
  password: string;
  avatar: string;
  rank: string;
  level: number;
  xp: number;
  stats: Record<StatType, number>;
}

interface IncreaseStatPayload {
  stat: StatType;
  amount: number;
}

const initialState: PlayerState = {
  name: "player",
  email: "",
  password: "",
  avatar: "",
  rank: GAME_CONFIG.ranks[0],
  level: 1,
  xp: 0,
  stats: GAME_CONFIG.stats.reduce((acc, stat) => {
    acc[stat] = 1;
    return acc;
  }, {} as Record<StatType, number>),
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    gainXP: (state, action: PayloadAction<number>) => {
      state.xp += action.payload;
      while (state.xp >= GAME_CONFIG.levelXp) {
        state.level += 1;
        state.xp -= GAME_CONFIG.levelXp;

        if (state.level % GAME_CONFIG.rankUpLevel === 0) {
          const currentIndex = GAME_CONFIG.ranks.indexOf(state.rank);
          if (currentIndex < GAME_CONFIG.ranks.length - 1) {
            state.rank = GAME_CONFIG.ranks[currentIndex + 1];
          }
        }
      }
    },
    increaseStat: (state, action: PayloadAction<IncreaseStatPayload>) => {
      const { stat, amount } = action.payload;
      state.stats[stat] += amount;
    },
  },
});

export const { gainXP, increaseStat } = playerSlice.actions;
export default playerSlice.reducer;
