// components/StatsCard.tsx
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../src/store/hook/hook';
import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { gainXP, increaseStat } from '~/src/store/slices/playerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../universal/AppButton';

const statIcons: Record<string, JSX.Element> = {
  strength: <FontAwesome5 name="dumbbell" size={20} color="#6366f1" />,
  stamina: <MaterialCommunityIcons name="run" size={20} color="#10b981" />,
  intelligence: <Entypo name="light-bulb" size={20} color="#f59e0b" />,
  karma: <MaterialCommunityIcons name="yin-yang" size={20} color="#ec4899" />,
};

const StatsCard = () => {
  const { stats, xp, level, rank } = useAppSelector(state => state.player);
  const xpPercent = (xp / 100) * 100; // If using static 100 XP per level

  const statEntries = Object.entries(stats);
  const dispatch = useAppDispatch();
  const player = useAppSelector(state => state.player);
  AsyncStorage.getItem('persist:root').then(data => {
  const parsed = JSON.parse(data || '{}');
  const player = parsed.player ? JSON.parse(parsed.player) : null;
  console.log('✅ Player slice data:', player);
});
  return (
    <View className="bg-white p-4 rounded-2xl shadow-md mx-4 mt-6">
      {/* Level + XP Circle */}
      <View className="items-center mb-5">
        <CircularProgress
          value={xpPercent}
          radius={60}
          duration={1000}
          activeStrokeColor="#6366f1"
          inActiveStrokeColor="#e5e7eb"
          inActiveStrokeWidth={15}
          activeStrokeWidth={15}
          title={`Level`}
          titleColor="#111827"
          titleStyle={{ fontWeight: 'bold' }}
          valueSuffix="%"
          progressValueColor="#1f2937"
        />
        <Text className="mt-2 text-gray-500 text-sm">XP: {xp}/100</Text>
        <Text className="mt-2 text-gray-500 text-sm">Rank: {rank}</Text>
        <Text className="mt-2 text-gray-500 text-sm">Level: {level}</Text>
      </View>

      {/* Stat Rows */}
      <Text className="text-xl font-semibold text-center mb-3 text-gray-800">Your Stats</Text>
      <View className="flex-row flex-wrap justify-between">
        {statEntries.map(([stat, value]) => (
          <View
            key={stat}
            className="w-[48%] flex-row items-center justify-between bg-gray-100 px-4 py-3 mb-2 rounded-lg"
          >
            <View className="flex-row items-center space-x-2">
              {statIcons[stat]}
              <Text className="capitalize font-medium text-gray-700">{stat}</Text>
            </View>
            <Text className="font-bold text-gray-800">{value}</Text>
          </View>
        ))}
      </View>
      <AppButton title='Increase Inteligence'  onPress={() => dispatch(increaseStat({ stat: "intelligence", amount: 1  }))} />
      <Button title="Gain 20 XP" onPress={() => dispatch(gainXP(20))} />
      <Button title="Increase Strength" onPress={() => dispatch(increaseStat({ stat: 'karma', amount: 2  }))} />
    </View>
  );
};

export default StatsCard;
