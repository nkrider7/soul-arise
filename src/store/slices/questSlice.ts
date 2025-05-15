import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import { Challenges, Difficulty, Gender } from '~/src/config/challenge';
import { systemQuest } from '~/src/config/systemQuest';
import { SystemQuest, UserQuest } from '~/src/type';

/**
 * Quest State Interface
 */
interface QuestState {
  systemQuests: SystemQuest[];
  userQuests: UserQuest[];
}

/**
 * TakeChallenge Payload Interface
 */
interface TakeChallengePayload {
  difficulty: Difficulty;
  gender: Gender;
}

/**
 * Initial Quest State
 */
const initialState: QuestState = {
  systemQuests: systemQuest, // Default system quests (example config)
  userQuests: [],
};

/**
 * Quest Slice
 */
const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    /**
     * Add a new custom user-created quest
     */
    addUserQuest: (state, action: PayloadAction<Omit<UserQuest, 'id'>>) => {
      const newQuest: UserQuest = {
        ...action.payload,
        id: uuid.v4() as string,
        createdBy: 'user',
      };
      state.userQuests.push(newQuest);
    },

    /**
     * Update progress of a quest (system or user)
     */
    updateProgress: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const quest = [...state.systemQuests, ...state.userQuests].find(q => q.id === action.payload.id);
      if (!quest || quest.status === 'completed') return;

      quest.progress += action.payload.amount;

      if (quest.progress >= quest.goal) {
        quest.progress = quest.goal;
        quest.status = 'completed';
        // TODO: handle reward distribution in middleware or UI after completion
      } else {
        quest.status = 'in_progress';
      }
    },

    /**
     * Delete a user-created quest
     */
    deleteUserQuest: (state, action: PayloadAction<string>) => {
      state.userQuests = state.userQuests.filter(q => q.id !== action.payload);
    },

    /**
     * Toggle a checklist item in a user quest
     */
    toggleChecklistItem: (
      state,
      action: PayloadAction<{ questId: string; itemId: string }>
    ) => {
      const quest = state.userQuests.find(q => q.id === action.payload.questId);
      if (!quest?.checklist) return;

      const item = quest.checklist.find(i => i.id === action.payload.itemId);
      if (item) {
        item.done = !item.done;
      }
    },

    /**
     * Reset all quests to initial state
     */
    resetQuests: () => initialState,

    /**
     * Generate quests from a system challenge based on difficulty and gender
     */
    takeChallenge: (state, action: PayloadAction<TakeChallengePayload>) => {
      const { difficulty, gender } = action.payload;
      const selectedChallenge = Challenges.find(c => c.difficulty === difficulty);
      if (!selectedChallenge) return;

      selectedChallenge.quests
        .filter(q => q.gender === 'any' || q.gender === gender)
        .forEach(q => {
          const newQuest: SystemQuest = {
            id: uuid.v4() as string,
            title: q.title,
            description: q.description,
            goal: q.goal,
            progress: 0,
            type: q.type ?? 'custom', // Replace 'defaultType' with an appropriate default value
            status: 'pending',
            createdBy: 'system',
            checklist: [],
          };
          state.systemQuests.push(newQuest);
        });
    },
  },
});

/**
 * Export Actions
 */
export const {
  addUserQuest,
  updateProgress,
  deleteUserQuest,
  toggleChecklistItem,
  resetQuests,
  takeChallenge,
} = questSlice.actions;

/**
 * Export Reducer
 */
export default questSlice.reducer;
