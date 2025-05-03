import React, { ReactNode } from 'react';
import { Text, TextStyle, TextProps } from 'react-native';

type FontVariant = 'normal' | 'bold' | 'semibold' | 'light';

interface AppTextProps extends TextProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  variant?: FontVariant;
  className?: string;
}

const FONT_MAP: Record<FontVariant, string> = {
  normal: 'Normal',
  bold: 'Bold',
  semibold: 'Semibold',
  light: 'Light',
};

export default function AppText({
  children,
  style,
  className,
  variant = 'normal',
  ...rest
}: AppTextProps) {
  return (
    <Text
      className={className} // Let NativeWind apply Tailwind styles
      style={[{ fontFamily: FONT_MAP[variant] }, style]} // Only handle font
      {...rest}
    >
      {children}
    </Text>
  );
}
