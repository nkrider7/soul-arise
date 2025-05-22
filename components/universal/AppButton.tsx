import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import AppText from './AppText'; // Assuming you already have this component
import { Button } from '../nativewindui/Button';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'purple'; // Different colors
  size?: 'xs' |  'sm' | 'md' | 'lg'; // Different sizes
}

const colorVariants = {
  primary: 'bg-teal-400 border-teal-500 text-teal-100',
  secondary: 'bg-purple-600 border-purple-500 text-purple-100',
  danger: 'bg-red-500 border-red-600 text-red-100',
  success: 'bg-green-500 border-green-600 text-green-100',
  purple: 'bg-purple-500 border-purple-600 text-purple-100',
};

const sizeVariants = {
  xs: 'py-1 px-2 text-xs',
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
};

export default function AppButton({
  title,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: AppButtonProps) {
  const colorClass = colorVariants[variant];
  const sizeClass = sizeVariants[size];

  return (
    <Button
      className={`rounded-lg border-2 m-2 items-center justify-center ${colorClass.split(' ').slice(0,2).join(' ')} ${sizeClass} ${className}`}
      {...props}
    >
      <AppText variant='bold' className={`${colorClass.split(' ')[2]} ${sizeClass.split(' ')[2]}`}>
        {title}
      </AppText>
    </Button>
  );
}
