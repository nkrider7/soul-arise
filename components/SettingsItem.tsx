// components/SettingsItem.tsx

import { View, Text, TouchableOpacity } from 'react-native';
import { LucideIcon, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { cn } from '~/lib/cn'; // optional: if you have a classNames helper

interface SettingsItemProps {
  title: string;
  icon: LucideIcon;
  onPress: () => void;
}

export default function SettingsItem({ title, icon: Icon, onPress }: SettingsItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between  px-4 py-3"
    >
      <View className="flex-row items-center gap-x-3">
        <Icon size={20} color="white" />
        <Text className="text-white text-base font-semibold">{title}</Text>
      </View>
      <View>
        <ChevronRight size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
}
