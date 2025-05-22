import React from 'react';
import { Platform, Pressable, ViewStyle } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { COLORS } from '~/theme/colors';
import { cn } from '~/lib/cn'; // Tailwind merge helper (like clsx for Tailwind RN)

function convertToRGBA(rgb: string, opacity: number): string {
  const rgbValues = rgb.match(/\d+/g);
  if (!rgbValues || rgbValues.length !== 3) {
    throw new Error('Invalid RGB color format');
  }
  const red = parseInt(rgbValues[0], 10);
  const green = parseInt(rgbValues[1], 10);
  const blue = parseInt(rgbValues[2], 10);
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be a number between 0 and 1');
  }
  return `rgba(${red},${green},${blue},${opacity})`;
}

export const ANDROID_RIPPLE = {
  dark: {
    primary: { color: convertToRGBA(COLORS.dark.grey3, 0.4), borderless: false },
    secondary: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
    plain: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
    tonal: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
  },
  light: {
    primary: { color: convertToRGBA(COLORS.light.grey4, 0.4), borderless: false },
    secondary: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
    plain: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
    tonal: { color: convertToRGBA(COLORS.light.grey6, 0.4), borderless: false },
  },
};

type RippleWrapperProps = {
  children: React.ReactNode;
  variant?: keyof typeof ANDROID_RIPPLE['light'];
  style?: ViewStyle;
  className?: string; // 👈 Add this for Tailwind styling
};

const RippleWrapper: React.FC<RippleWrapperProps> = ({
  children,
  variant = 'plain',
  style,
  className,
}) => {
  const { colorScheme } = useColorScheme();

  if (Platform.OS !== 'android') {
    return <>{children}</>;
  }

  return (
    <Pressable
      android_ripple={ANDROID_RIPPLE[colorScheme][variant]}
      style={style}
      className={cn(className)} // 👈 Apply Tailwind className directly to Pressable
    >
      {children}
    </Pressable>
  );
};

export default RippleWrapper;
