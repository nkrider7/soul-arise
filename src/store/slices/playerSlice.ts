import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import GAME_CONFIG, { StatType } from '../../config/gameconfig';
import { QuestRewards } from '~/src/type';
import { differenceInCalendarDays } from 'date-fns'; 
import { Difficulty } from '~/src/config/challenge';

interface Character {
  name: string;
  image: any; // can be local require() or URL
  fullCharacterImage: any;
  backgroundImage: any;
  powers: string[];
  gender: 'male' | 'female' | 'other';
  description?: string;
  rankLevel?: string;
}

interface AcceptedChallenge {
  challengeId: string;
  startDate: string;
  difficulty: Difficulty;
  durationDays: number;
  completed: boolean;
}
interface AcceptChallengePayload {
  challengeId: string;
  difficulty: Difficulty;
  durationDays: number;
}

interface PlayerState {
  name: string;
  email: string;
  password: string;
  avatar: string;
  rank: string;
  level: number;
  xp: number;
  stats: Record<StatType, number>;
  currentStreak: number;
  maxStreak: number;
  lastActiveDate: string | null;
  character: Character | null;
  acceptedChallenges: AcceptedChallenge[];  // <-- NEW
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
  currentStreak: 0,
  maxStreak: 0,
  lastActiveDate: null,
  character: null,
  acceptedChallenges: [],  // <-- NEW
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.character = action.payload;
      state.avatar = action.payload.image; // Sync avatar field separately if needed
    },
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
    applyQuestRewards: (state, action: PayloadAction<QuestRewards>) => {
      const { xp, statBoost, coins } = action.payload;
    
      state.xp += xp;
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
    
      if (statBoost) {
        state.stats[statBoost.stat] += statBoost.amount;
      }
    
      // TODO: Handle coins if you add a currency system
    },
    

    updateStreak: (state) => {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const lastActive = state.lastActiveDate;

      if (!lastActive) {
        state.currentStreak = 1;
        state.maxStreak = 1;
      } else {
        const daysSinceLast = differenceInCalendarDays(new Date(today), new Date(lastActive));

        if (daysSinceLast === 1) {
          state.currentStreak += 1;
        } else if (daysSinceLast > 1) {
          state.currentStreak = 1; // reset streak
        }

        if (state.currentStreak > state.maxStreak) {
          state.maxStreak = state.currentStreak;
        }
      }

      state.lastActiveDate = today;
    },
    acceptChallenge: (state, action: PayloadAction<AcceptChallengePayload>) => {
      const { challengeId, difficulty, durationDays } = action.payload;
      state.acceptedChallenges.push({
        challengeId,
        startDate: new Date().toISOString(),
        difficulty,
        durationDays,
        completed: false,
      });
    },

    
  },

});

export const { gainXP, increaseStat, applyQuestRewards, acceptChallenge, selectCharacter } = playerSlice.actions;

export default playerSlice.reducer;
