import uuid from 'react-native-uuid';
import { SystemQuest } from '../type';
// import { QuestStatus, QuestType, CreatedBy, StatType } from '../config/enums'; // Adjust path as needed

export const systemQuest: SystemQuest[] = [
  {
    id: uuid.v4() as string,
    title: '20 Pushups',
    goal: 20,
    progress: 0,
    status: 'pending',
    type: "fitness",
    createdBy: "system" ,
    rewards: {
      xp: 50,
      statBoost: {
        stat: "strength",
        amount: 3,
      },
      coins: 10,
    },
  },
  {
    id: uuid.v4() as string,
    title: 'Read 1 Page of Book',
    goal: 1,
    progress: 0,
    status: 'pending',
    type: 'learning',
    createdBy: "system",
    rewards: {
      xp: 14,
      statBoost: {
        stat:"intelligence",
        amount: 5,
      },
      coins: 10,
    },
  },
  {
    id: uuid.v4() as string,
    title: 'Meditate for 5 Minutes',
    goal: 1,
    progress: 0,
    status: "pending",
    type: "fitness",
    createdBy: 'system',
    rewards: {
      xp: 20,
      statBoost: {
        stat: "intelligence",
        amount: 2,
      },
      coins: 5,
    },
  },
  {
    id: uuid.v4() as string,
    title: 'Walk 2000 Steps',
    goal: 2000,
    progress: 0,
    status: "pending",
    type: "fitness",
    createdBy: "system",
    rewards: {
      xp: 30,
      statBoost: {
        stat: "strength",
        amount: 1,
      },
      coins: 8,
    },
  },
  {
    id: uuid.v4() as string,
    title: 'Watch 1 Tutorial Video',
    goal: 1,
    progress: 0,
    status: 'pending',
    type: "learning",
    createdBy: "system",
    rewards: {
      xp: 25,
      statBoost: {
        stat: "intelligence",
        amount: 3,
      },
      coins: 7,
    },
  },
  {
    id: uuid.v4() as string,
    title: 'Write a Journal Entry',
    goal: 1,
    progress: 0,
    status: "pending",
    type: 'custom',
    createdBy: "system",
    rewards: {
      xp: 15,
      statBoost: {
        stat: "intelligence",
        amount: 2,
      },
      coins: 6,
    },
  },
];
