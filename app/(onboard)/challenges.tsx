import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Challenges } from '~/src/config/challenge';
import { useDispatch, useSelector } from 'react-redux';
import { takeChallenge } from '~/src/store/slices/questSlice';
import { acceptChallenge } from '~/src/store/slices/playerSlice';
import { RootState } from '~/src/store';
import { router } from 'expo-router';
import AppText from '~/components/universal/AppText';
import AppButton from '~/components/universal/AppButton';
import { lightTheme } from '~/theme/colors';

const { width } = Dimensions.get('window');

function ChallengesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const gender = useSelector((state: RootState) => state.player.character?.gender || 'male');

  const [step, setStep] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'normal' | 'hard' | 'custom' | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(20);
  const [goals, setGoals] = useState<{ [title: string]: number }>({});
  const [selectedQuests, setSelectedQuests] = useState<string[]>([]); // 👈 track selected quests

  const handleGoalChange = (title: string, value: string) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setGoals(prev => ({ ...prev, [title]: Math.min(numericValue, 100000) }));
    }
  };

  const handleSelectQuest = (title: string) => {
    setSelectedQuests(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handleGoNext = () => {
    if (step < 2) {
      setStep(prev => prev + 1);
    } else {
      if (!selectedDifficulty) return;

      if (selectedQuests.length < 5) {
        Alert.alert('Select at least 5 quests to continue!');
        return;
      }

      const challenge = Challenges.find(c => c.difficulty === selectedDifficulty);
      if (challenge) {
        dispatch(takeChallenge({ difficulty: selectedDifficulty, gender }));
        dispatch(acceptChallenge({
          challengeId: selectedDifficulty,
          difficulty: selectedDifficulty,
          durationDays: selectedDuration,
        }));
        router.navigate('/(drawer)/(tabs)');
      }
    }
  };

  const handleGoPrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const selectedChallenge = Challenges.find(c => c.difficulty === selectedDifficulty);

  const challenges = [
    {
      title: 'Easy',
      description: 'Easy challenges are for beginners.',
      key: 'easy',
      background: require('../../assets/banner/main.jpg'),
      color: '#84cc16',
    },
    {
      title: 'Normal',
      description: 'Easy challenges are for beginners.',
      key: 'normal',
      background: require('../../assets/banner/main.jpg'),
      color: '#5C1486',
    },
    {
      title: 'Hard',
      description: 'Easy challenges are for beginners.',
      key: 'hard',
      background: require('../../assets/banner/main.jpg'),
      color: '#991b1b',
    },
    {
      title: 'Custom',
      description: 'Easy challenges are for beginners.',
      key: 'custom',
      background: require('../../assets/banner/main.jpg'),
      color: 'blue',
    }
  ]

  return (
    <View style={{ backgroundColor: lightTheme.background }} className="flex-1 px-10 pt-12">

      {step === 0 && (
        <>
          <AppText variant='bold' className="text-2xl text-white text-center mb-6">Now Challenges Select</AppText>
          {challenges.map((item, index) => (
            <ImageBackground key={index} source={item.background} className={`rounded-xl mb-4  bg-slate-950  items-center  ${selectedDifficulty === item.key ? 'border-blue-600' : 'border-blue-100'} `} imageStyle={{ borderRadius: 20 }} imageClassName='' resizeMode="stretch">
              <TouchableOpacity
                style={{
                  backgroundColor: `${item.color}A6`,
                }}
                className={`w-full py-8 rounded-xl  items-center border-4 ${selectedDifficulty === item.key ? 'border-blue-600' : 'border-blue-100'
                  }`}
                onPress={() => setSelectedDifficulty(item.key as any)}
              >
                <AppText variant='bold' className={` text-3xl capitalize `} style={{ color: item.color }}>{item.key}</AppText>
                <AppText variant='semibold' className="text-sm capitalize text-white">{item.description}</AppText>

              </TouchableOpacity>
            </ImageBackground>
          ))}

          <AppButton title='Next' onPress={handleGoNext} className='bg-red-500 border-red-400' />
        </>
      )}

      {step === 1 && selectedDifficulty && (
        <>
          <Text className="text-2xl font-bold text-center mb-2 capitalize text-white">{selectedDifficulty}</Text>

          {/* Selected count */}
          <Text className="text-center text-white mb-4">
            Selected: {selectedQuests.length} quests
          </Text>

          <FlatList
            data={selectedChallenge?.quests || []}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              const currentGoal = goals[item.title] ?? item.goal;
              const isSelected = selectedQuests.includes(item.title);

              return (
                <TouchableOpacity
                  onPress={() => handleSelectQuest(item.title)}
                  style={{
                    backgroundColor: isSelected ? '#3b82f6' : lightTheme.background2,
                  }}
                  className="p-4 rounded-xl mb-4"
                >
                  <AppText variant='bold' className="text-lg text-white font-semibold">{item.title}</AppText>
                  <AppText className="text-sm text-white mt-1">{item.description}</AppText>
                  <AppText className="text-xs mt-1 text-white italic">Reward: {item.reward.xp} XP</AppText>

                  <View className="flex-row items-center mt-4">
                    <AppText variant="semibold" className="text-white mr-2">Goal:</AppText>
                    <TextInput
                      value={String(currentGoal)}
                      onChangeText={(text) => handleGoalChange(item.title, text)}
                      keyboardType="numeric"
                      style={{
                        backgroundColor: '#1f2937',
                        color: 'white',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                        width: 100,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
          />

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity className="bg-gray-500 py-4 rounded-xl w-[48%] items-center" onPress={handleGoPrev}>
              <Text className="text-lg text-white">Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 py-4 rounded-xl w-[48%] items-center" onPress={handleGoNext}>
              <Text className="text-lg text-white">Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step === 2 && (
        <>
          <Text className="text-2xl font-bold text-center mb-10 text-white">Select Days</Text>
          <View className="flex-1 items-center justify-center">

            {/* Days control */}
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity
                onPress={() => setSelectedDuration(prev => Math.max(5, prev - 1))}
                className="bg-gray-600 px-6 py-2 rounded-full"
              >
                <Text className="text-white text-3xl font-bold">-</Text>
              </TouchableOpacity>

              <Text className="text-4xl text-white font-bold">{selectedDuration} Days</Text>

              <TouchableOpacity
                onPress={() => setSelectedDuration(prev => Math.min(90, prev + 1))}
                className="bg-gray-600 px-6 py-2 rounded-full"
              >
                <Text className="text-white text-3xl font-bold">+</Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* Buttons */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-gray-500 py-4 rounded-xl w-[48%] items-center" onPress={handleGoPrev}>
              <Text className="text-lg text-white">Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 py-4 rounded-xl w-[48%] items-center" onPress={handleGoNext}>
              <Text className="text-lg text-white">Accept</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

export default ChallengesScreen;
