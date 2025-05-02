// types/quest.ts

export type QuestStatus = 'pending' | 'in_progress' | 'completed';

export interface BaseQuest {
  id: string;
  title: string;
  description?: string;
  goal: number;
  progress: number;
  status: QuestStatus;
  type: 'fitness' | 'learning' | 'custom';
}

export interface SystemQuest extends BaseQuest {
  createdBy: 'system';
}

export interface UserQuest extends BaseQuest {
  createdBy: 'user';
  link?: string; // Optional link to article/video/etc.
  checklist?: { id: string; title: string; done: boolean }[]; // Optional list of subtasks
  icon?: string; 
}
