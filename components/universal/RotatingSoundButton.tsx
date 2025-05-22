// components/RotatingSoundButton.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View, Image } from 'react-native';
import { Audio } from 'expo-av';
import { soundFiles } from '~/src/utils/soundFiles'; // adjust if needed
import { Music4 } from 'lucide-react-native';

export default function RotatingSoundButton() {
  const rotation = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Animate rotation
  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotation.stopAnimation();
    rotation.setValue(0);
  };

  const toggleSound = async () => {
    if (isPlaying) {
      await soundRef.current?.stopAsync();
      setIsPlaying(false);
      stopRotation();
    } else {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(soundFiles.bgm);
        soundRef.current = sound;
      }
      await soundRef.current?.setIsLoopingAsync(true);
      await soundRef.current?.playAsync();
      setIsPlaying(true);
      startRotation();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
      stopRotation();
    };
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Pressable onPress={toggleSound}>
      <Animated.View style={[styles.circle, { transform: [{ rotate }] }]}>
       <Music4 color={'white'} // ✅ replace with your icon
          style={styles.icon}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
});
