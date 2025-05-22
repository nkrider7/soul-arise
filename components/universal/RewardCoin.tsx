import React, { useEffect } from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
// import LottieView from 'lottie-react-native';

type RewardModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function RewardModalCoins({ visible, onClose }: RewardModalProps) {
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 300 }) }],
    };
  }, []);

  useEffect(() => {
    if (visible) {
      scale.value = 1;
    } else {
      scale.value = 0;
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable  onPress={onClose} className="flex-1 bg-black/50 justify-center items-center">
        <Animated.View className="bg-white rounded-2xl p-6 items-center w-4/5" style={animatedStyle}>
          <Text className="text-xl font-bold text-yellow-600 mb-4">🎉 Congratulations!</Text>

          {/* <LottieView
            source={require('../../assets/coinsstack.json')} // Replace with your Lottie file path
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          /> */}

          <Image source={require('../../assets/inventory/coin.png')} className='h-20 w-20' resizeMode='cover'  />

          <Text className="text-base font-semibold text-gray-700 mt-4">
            You've earned <Text className="text-yellow-500">+50 Coins!</Text>
          </Text>

          <Pressable
            onPress={onClose}
            className="mt-6 px-4 py-2 bg-yellow-500 rounded-lg"
          >
            <Text className="text-white font-semibold">Awesome!</Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
