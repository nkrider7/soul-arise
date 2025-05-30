import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function RotatingIcon() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Pressable
      onPress={() => {
        rotation.value = withTiming(rotation.value + 360, { duration: 500 });
      }}
    >
      <AnimatedSvg
        width={32}
        height={32}
        style={animatedStyle}
        viewBox="0 0 24 24"
      >
        <Path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z" stroke="white" strokeWidth="2" />
      </AnimatedSvg>
    </Pressable>
  );
}
