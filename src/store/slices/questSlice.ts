import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { SystemQuest, UserQuest } from '~/src/type';



interface QuestState {
    systemQuests: SystemQuest[];
    userQuests: UserQuest[];
  }

// Initial State
const initialState: QuestState = {
    systemQuests: [
      {
        id: uuid.v4() as string,
        title: '100 Pushups',
        goal: 100,
        progress: 0,
        status: 'pending',
        type: 'fitness',
        createdBy: 'system',
      },
    ],
    userQuests: [],
  };

// Slice
const questSlice = createSlice({
    name: 'quest',
    initialState,
    reducers: {
      addUserQuest: (state, action: PayloadAction<Omit<UserQuest, 'id'>>) => {
        const newQuest: UserQuest = {
          ...action.payload,
          id: uuid.v4() as string,
          createdBy: 'user',
        };
        state.userQuests.push(newQuest);
      },
  
      updateProgress: (state, action: PayloadAction<{ id: string; amount: number }>) => {
        const allQuests = [...state.systemQuests, ...state.userQuests];
        const quest = allQuests.find(q => q.id === action.payload.id);
        if (!quest || quest.status === 'completed') return;
  
        quest.progress += action.payload.amount;
        if (quest.progress >= quest.goal) {
          quest.progress = quest.goal;
          quest.status = 'completed';
        } else {
          quest.status = 'in_progress';
        }
      },
  
      deleteUserQuest: (state, action: PayloadAction<string>) => {
        state.userQuests = state.userQuests.filter(q => q.id !== action.payload);
      },
  
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
    },
  });
  

  export const {
    addUserQuest,
    updateProgress,
    deleteUserQuest,
    toggleChecklistItem,
  } = questSlice.actions;
  
  export default questSlice.reducer;