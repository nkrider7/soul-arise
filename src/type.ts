import { StatType } from '~/src/config/gameconfig';

export type QuestStatus = 'pending' | 'in_progress' | 'completed';

export type QuestType = 'fitness' | 'learning' | 'custom';

export interface ChecklistItem {
  id: string;
  title: string;
  done: boolean;
}

export interface QuestRewards {
  xp: number;
  statBoost?: {
    stat: StatType;
    amount: number;
  };
  coins?: number;
}

export interface BaseQuest {
  id: string;
  title: string;
  description?: string;
  goal: number;
  progress: number;
  status: QuestStatus;
  type: QuestType;
  rewards?: QuestRewards;
}

export interface SystemQuest extends BaseQuest {
  createdBy: 'system';
}

export interface UserQuest extends BaseQuest {
  createdBy: 'user';
  link?: string;
  checklist?: ChecklistItem[];
  icon?: string;
}
