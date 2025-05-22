import { useState, useEffect } from 'react';
import { View, Button, Text, PermissionsAndroid, Platform } from 'react-native';
import { router } from 'expo-router';

export default function VoiceStartScreen() {
  // const [isListening, setIsListening] = useState(false);
  // const [isAnimating, setIsAnimating] = useState(false);

  // useEffect(() => {
  //   // Setup voice event listener
  //   Voice.onSpeechResults = (event) => {
  //     const speech = event.value?.[0]?.toLowerCase();
  //     console.log('Heard:', speech);
  //     if (speech?.includes('arise')) {
  //       triggerPowerAnimation();
  //     }
  //   };

  //   // Cleanup listeners when component unmounts
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const requestMicrophonePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //         {
  //           title: 'Microphone Permission',
  //           message: 'This app needs access to your microphone to detect your voice.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn('Permission error:', err);
  //       return false;
  //     }
  //   } else {
  //     return true; // iOS will ask automatically
  //   }
  // };

  // const startListening = async () => {
  //   const permissionGranted = await requestMicrophonePermission();
  //   if (!permissionGranted) {
  //     console.warn('Microphone permission denied');
  //     return;
  //   }

  //   try {
  //     setIsListening(true);
  //     await Voice.start('en-US');
  //   } catch (error) {
  //     console.error('Voice Start Error:', error);
  //   }
  // };

  // const triggerPowerAnimation = () => {
  //   setIsListening(false);
  //   setIsAnimating(true);
  //   setTimeout(() => {
  //     router.push('/(tabs)'); // Navigate after animation
  //   }, 3000); // Adjust based on your animation time
  // };

  return (
    <View className="flex-1 items-center justify-center bg-black">
     
     
        <Text>this is working rebuild </Text>
          {/* <Text className="text-white text-2xl mb-10">Say "Arise" to Start!</Text>
          <Button
            title={isListening ? "Listening..." : "Start Listening"}
            onPress={startListening}
            disabled={isListening}
          />
        </>
      ) : (
        <View className="items-center">
          <Text className="text-white text-3xl">⚡ POWER RISING ⚡</Text>
          
        </View>
      )} */}
    </View>
  );
}
