import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface HabitCounterCardProps {
  title: string;
  stat: string;
  streak: number;
  maxStreak: number;
  status: 'completed' | 'missed' | 'pending';
  icon?: keyof typeof iconMap;
  onPress?: () => void;
}

const iconMap = {
  'hand-fist': 'hand-fist',
  'flame': 'fire',
  'dumbbell': 'dumbbell',
  'brain': 'brain',
  'seedling': 'seedling',
};

const StatusColorMap = {
  completed: 'bg-green-500',
  missed: 'bg-red-500',
  pending: 'bg-yellow-500',
};

export const HabitCounterCard: React.FC<HabitCounterCardProps> = ({
  title,
  stat,
  streak,
  maxStreak,
  status,
  icon = 'flame',
  onPress,
}) => {
  const statusClass = StatusColorMap[status];
  const iconName = iconMap[icon] || 'fire';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl shadow-md p-4  mb-2 flex-row items-center justify-between ${statusClass}`}
    >
      <View className="flex-row items-center gap-x-3">
        <FontAwesome6 name={iconName as any} size={24} color="white" />
        <View>
          <Text className="text-white text-lg font-bold">{title}</Text>
          <Text className="text-white text-xs">Stat: {stat}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-white text-sm">🔥 Streak: {streak}</Text>
        <Text className="text-white text-sm">🏆 Max: {maxStreak}</Text>
      </View>
    </TouchableOpacity>
  );
};
