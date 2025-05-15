import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Challenges } from '~/src/config/challenge';
import { useDispatch, useSelector } from 'react-redux';
import { takeChallenge } from '~/src/store/slices/questSlice';
import { acceptChallenge } from '~/src/store/slices/playerSlice';
import { RootState } from '~/src/store'; // adjust if needed
import { Button } from '~/components/nativewindui/Button';
import AppText from '~/components/universal/AppText';
import { lightTheme } from '~/theme/colors';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

function ChallengesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const gender = useSelector((state: RootState) => state.player.character?.gender || 'male');

  const [step, setStep] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'normal' | 'hard' | 'custom' | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(20);

  const handleGoNext = () => {
    if (step < 2) {
      setStep(prev => prev + 1);
    } else {
      if (selectedDifficulty) {
        const challenge = Challenges.find(c => c.difficulty === selectedDifficulty);
        if (challenge) {
          dispatch(takeChallenge({ difficulty: selectedDifficulty, gender }));
          dispatch(acceptChallenge({
            challengeId: selectedDifficulty,
            difficulty: selectedDifficulty,
            durationDays: selectedDuration,
          }));
          router.navigate('/(tabs)')
        }
      }
      
    }
  };

  return (
    <View style={{backgroundColor:lightTheme.background}} className="flex-1  px-10 pt-12">
      {step === 0 && (
        <>
          <AppText variant='bold' className="text-2xl  text-white text-center mb-6">Now Challenges Select</AppText>
          {['easy', 'normal', 'hard', 'custom'].map(diff => (
            <TouchableOpacity
              key={diff}
              style={{backgroundColor:lightTheme.background2}}
              className={`w-full py-4 rounded-xl mb-4 items-center border-2 ${
                selectedDifficulty === diff ? 'border-blue-600' : 'border-blue-100'
              }`}
              onPress={() => setSelectedDifficulty(diff as any)}
            >
              <AppText variant='bold' className="text-lg capitalize text-white">{diff}</AppText>
            </TouchableOpacity>
          ))}
          <Button  onPress={handleGoNext} className='bg-blue-400 w-40'>
            <AppText variant='bold'>Next</AppText>
          </Button>

         

          {/* <TouchableOpacity className="bg-blue-500 py-4 rounded-xl mt-6 items-center" onPress={handleGoNext}>
            <Text className="text-lg text-white">Go to Next</Text>
          </TouchableOpacity> */}
        </>
      )}

      {step === 1 && selectedDifficulty && (
        <>
          <Text className="text-2xl font-bold text-center mb-6 capitalize">{selectedDifficulty}</Text>
          <FlatList
            data={Challenges.find(c => c.difficulty === selectedDifficulty)?.quests || []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="bg-gray-100 p-4 rounded-xl mb-4">
                <Text className="text-lg font-semibold">{item.title}</Text>
                <Text className="text-sm mt-1">{item.description}</Text>
                <Text className="text-xs mt-1 italic text-green-600">Reward: {item.reward.xp} XP</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity className="bg-blue-500 py-4 rounded-xl mt-6 items-center" onPress={handleGoNext}>
            <Text className="text-lg text-white">I am okay with</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text className="text-2xl font-bold text-center mb-10">Select Days</Text>
          <View className="flex-1 items-center justify-center">
            <Text className="text-4xl font-bold">{selectedDuration} Days</Text>
          </View>
          <TouchableOpacity className="bg-blue-500 py-4 rounded-xl mb-6 items-center" onPress={handleGoNext}>
            <Text className="text-lg text-white">I am okay with</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default ChallengesScreen;
