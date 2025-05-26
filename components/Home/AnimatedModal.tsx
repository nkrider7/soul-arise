import React, { useEffect } from 'react';
import { Modal, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface AnimatedCornerIconModalProps {
  visible: boolean;
  onClose: () => void;
  backgroundColor: string;
  children?: React.ReactNode;
}

const AnimatedCornerIconModal: React.FC<AnimatedCornerIconModalProps> = ({
  visible,
  onClose,
  backgroundColor,
  children,
}) => {
  const scale = useSharedValue(0.5);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.exp) });
    } else {
      scale.value = withTiming(0.5, { duration: 200, easing: Easing.in(Easing.exp) });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/80 items-center justify-center">
          <TouchableWithoutFeedback>
            <Animated.View
              className="w-fit h-fit  p-5  relative items-center justify-center rounded-lg"
              style={[{ backgroundColor }, animatedStyle]}
            >
            <Image
                source={require('../../assets/icons/icons.png')}
                className="w-6 h-6 absolute -rotate-45 -left-4 -top-4 m-1"
                resizeMode="contain"
              />
              {/* Top Right */}
              <Image
                source={require('../../assets/icons/icons.png')}
                className="w-6 h-6 absolute rotate-45 -right-4 -top-4 m-1"
                resizeMode="contain"
              />
              {/* Bottom Left */}
              <Image
                source={require('../../assets/icons/icons.png')}
                className="w-6 h-6 absolute   -left-4 -bottom-4 m-1"
                resizeMode="contain"
              />
              {/* Bottom Right */}
              <Image
                source={require('../../assets/icons/icons.png')}
				  style={{ transform: [{ scaleX: -1 }, { scaleY: -1 }] }}
                className="w-6 h-6 absolute  -right-4 -bottom-4 m-1"
                resizeMode="contain"
              />

              {/* Center Content */}
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AnimatedCornerIconModal;
