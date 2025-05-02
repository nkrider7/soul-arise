const STATS = ['strength', 'stamina', 'intelligence', 'karma'] as const;

const GAME_CONFIG = {
  levelXp: 100,
  rankUpLevel: 10,
  ranks: ['E', 'D', 'C', 'B', 'A', 'S'],
  stats: STATS,
};

export type StatType = typeof STATS[number]; // <-- This gives us 'strength' | 'stamina' | 'intelligence' | 'karma'

export default GAME_CONFIG;
