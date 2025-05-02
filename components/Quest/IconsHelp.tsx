import React from 'react';
import * as LucideIcons from 'lucide-react-native';

export const getLucideIcon = (
  name: string | null | undefined,
  size = 20,
  color = '#4f46e5'
) => {
  if (!name) return <LucideIcons.Circle size={size} color="#9ca3af" />;
  
  // Use a safe lookup with React.ComponentType
  const Icon = (LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<any>) || null;
  
  if (Icon) {
    return <Icon size={size} color={color} />;
  }
  
  // Fallback if no icon is found
  return <LucideIcons.Heart size={size} color="#9ca3af" />;
};
