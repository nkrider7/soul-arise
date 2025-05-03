import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { lightTheme } from '~/theme/colors';
import AppText from './AppText';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function AppButton({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  ...rest
}: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled, style]}
      activeOpacity={0.8}
      disabled={disabled}
      {...rest}
    >
      <AppText variant='bold' className='text-white' style={textStyle as TextStyle | TextStyle[] | undefined}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: lightTheme.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#d3d3d3',
  },
  
});
