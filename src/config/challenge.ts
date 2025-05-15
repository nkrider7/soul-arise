import { QuestType } from "../type";
import { StatType } from "./gameconfig";
export type Difficulty = 'easy' | 'normal' | 'hard' | 'custom';
export type Gender = 'male' | 'female' | 'other' | 'any'; 

export interface ChallengeQuest {
  title: string;
  description: string;
  goal: number;
  type?: QuestType;
  reward: {
    xp: number;
    statBoost?: {
      stat: StatType;
      amount: number;
    };
  };
  gender: Gender;  // <-- new field
}

export interface ChallengeConfig {
  difficulty: Difficulty;
  quests: ChallengeQuest[];
}

export const Challenges: ChallengeConfig[] = [
  {
    difficulty: 'easy',
    quests: [
      { title: 'Walk 2000 steps', description: 'Take it easy!', goal: 2000, reward: { xp: 100 }, gender: 'any' },
      { title: 'Yoga Session', description: 'Relax & breathe', goal: 1, reward: { xp: 120 }, gender: 'female' },
      { title: 'Pushup Practice', description: 'Strength training', goal: 20, reward: { xp: 150 }, gender: 'male' },
    ],
  },
  {
    difficulty: 'normal',
    quests: [
      { title: 'Run 3km', description: 'Feel the wind!', goal: 3, reward: { xp: 300 }, gender: 'any' },
      { title: 'Dance Workout', description: 'Have fun!', goal: 1, reward: { xp: 200 }, gender: 'female' },
      { title: 'Weight Lifting', description: 'Get stronger', goal: 1, reward: { xp: 250 }, gender: 'male' },
    ],
  },
  // ...more challenges
];
