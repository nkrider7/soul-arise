export type Difficulty = 'easy' | 'normal' | 'hard' | 'custom';
export type Gender = 'male' | 'female' | 'other' | 'any'; 
export type Category = 'fitness' | 'home' | 'gym' | 'learning' | 'college' | 'lifestyle' | 'personality' | 'more';

export interface ChallengeQuest {
  title: string;
  description: string;
  goal: number;
  category: Category;    // <-- added
  type?: 'fitness' | 'learning' | 'custom';
  reward: {
    xp: number;
    statBoost?: {
      stat: string;
      amount: number;
    };
  };
  gender: Gender;
}

export interface ChallengeConfig {
  difficulty: Difficulty;
  quests: ChallengeQuest[];
}


export const Challenges: ChallengeConfig[] = [
  {
    difficulty: 'easy',
    quests: [
      { title: 'Walk 2000 steps', description: 'Start moving!', goal: 2000, category: 'fitness', reward: { xp: 100 }, gender: 'any' },
      { title: 'Yoga Session', description: 'Relax your mind', goal: 1, category: 'home', reward: { xp: 120 }, gender: 'female' },
      { title: 'Pushup Practice', description: 'Build strength', goal: 20, category: 'gym', reward: { xp: 150 }, gender: 'male' },
      { title: 'Home Cleanup', description: 'Tidy your environment', goal: 1, category: 'home', reward: { xp: 100 }, gender: 'any' },
      { title: 'Read 10 Pages', description: 'Learning mindset', goal: 10, category: 'learning', reward: { xp: 120 }, gender: 'any' },

      { title: 'Stretching Routine', description: 'Stay flexible', goal: 1, category: 'fitness', reward: { xp: 100 }, gender: 'female' },
      { title: 'Light Jogging', description: 'Wake up body', goal: 1, category: 'fitness', reward: { xp: 110 }, gender: 'male' },
      { title: 'Prepare Healthy Meal', description: 'Nutrition focus', goal: 1, category: 'lifestyle', reward: { xp: 130 }, gender: 'any' },
      { title: 'Breathing Meditation', description: 'Calm the mind', goal: 1, category: 'personality', reward: { xp: 110 }, gender: 'any' },
      { title: 'Declutter Workspace', description: 'Organize your space', goal: 1, category: 'college', reward: { xp: 140 }, gender: 'any' },
    ],
  },
  {
    difficulty: 'normal',
    quests: [
      { title: 'Run 3km', description: 'Feel the energy!', goal: 3, category: 'fitness', reward: { xp: 300 }, gender: 'any' },
      { title: 'Dance Workout', description: 'Fun movement', goal: 1, category: 'home', reward: { xp: 200 }, gender: 'female' },
      { title: 'Weight Lifting', description: 'Build muscles', goal: 1, category: 'gym', reward: { xp: 250 }, gender: 'male' },
      { title: 'Study 2 hours', description: 'Focus and learn', goal: 2, category: 'learning', reward: { xp: 250 }, gender: 'any' },
      { title: 'Organize Study Notes', description: 'Stay sharp', goal: 1, category: 'college', reward: { xp: 220 }, gender: 'any' },

      { title: 'Cycling 5km', description: 'Outdoor fitness', goal: 5, category: 'fitness', reward: { xp: 280 }, gender: 'male' },
      { title: 'Pilates Session', description: 'Core strength', goal: 1, category: 'fitness', reward: { xp: 260 }, gender: 'female' },
      { title: 'Plan Weekly Goals', description: 'Stay productive', goal: 1, category: 'lifestyle', reward: { xp: 240 }, gender: 'any' },
      { title: 'Deep Focus Reading', description: 'Improve attention', goal: 1, category: 'learning', reward: { xp: 230 }, gender: 'any' },
      { title: 'Write Journal Entry', description: 'Self reflection', goal: 1, category: 'personality', reward: { xp: 200 }, gender: 'any' },
    ],
  },
  {
    difficulty: 'hard',
    quests: [
      { title: 'Run 10km', description: 'Endurance challenge!', goal: 10, category: 'fitness', reward: { xp: 600 }, gender: 'any' },
      { title: 'HIIT Session', description: 'Push limits!', goal: 1, category: 'gym', reward: { xp: 500 }, gender: 'male' },
      { title: 'Advanced Yoga', description: 'Master control', goal: 1, category: 'home', reward: { xp: 550 }, gender: 'female' },
      { title: 'Learn New Skill (2hrs)', description: 'Skill up!', goal: 2, category: 'learning', reward: { xp: 500 }, gender: 'any' },
      { title: 'Mock Exam Practice', description: 'Stay competitive', goal: 1, category: 'college', reward: { xp: 550 }, gender: 'any' },

      { title: 'Gym Heavy Lifting', description: 'Personal Record', goal: 1, category: 'gym', reward: { xp: 600 }, gender: 'male' },
      { title: 'Dance Choreography', description: 'Master moves', goal: 1, category: 'home', reward: { xp: 550 }, gender: 'female' },
      { title: 'Write 1000 words', description: 'Deep writing', goal: 1000, category: 'personality', reward: { xp: 520 }, gender: 'any' },
      { title: 'Plan 1 Month Ahead', description: 'Strategic thinking', goal: 1, category: 'lifestyle', reward: { xp: 500 }, gender: 'any' },
      { title: 'Organize Major Event', description: 'Leadership skill', goal: 1, category: 'college', reward: { xp: 580 }, gender: 'any' },
    ],
  }
];
