// components/StatsCard.tsx
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../src/store/hook/hook';
import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { gainXP, increaseStat } from '~/src/store/slices/playerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../universal/AppButton';
import AppText from '../universal/AppText';
import { lightTheme } from '~/theme/colors';
import { Brain, Dumbbell } from 'lucide-react-native';

const statIcons: Record<string, JSX.Element> = {
  strength: <Dumbbell  size={32} color="#6366f1" />,
  stamina: <MaterialCommunityIcons name="run" size={32} color="#10b981" />,
  intelligence: <Brain  size={32} color="#f59e0b" />,
  karma: <MaterialCommunityIcons name="yin-yang" size={34} color="#ec4899" />,
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
    <View className=" p-4 rounded-2xl shadow-md mx-4 mt-6">
      {/* Level + XP Circle */}
      <View className="items-center flex flex-row gap-x-4 mb-5">
        <CircularProgress
          value={xpPercent}
          radius={60}
          duration={1000}
          activeStrokeColor="#6366f1"
          activeStrokeSecondaryColor={'#10b981'}
          inActiveStrokeColor="#e5e7eb"
          inActiveStrokeWidth={15}
          activeStrokeWidth={15}
          title={`Level`}
          titleColor="#111827"
          titleStyle={{ fontFamily: 'Bold', fontSize: 20, color: 'white' }}
          valueSuffixStyle={{ fontFamily: 'Bold', fontSize: 20, color: 'white' }}
          progressValueStyle={{ fontFamily: 'Bold', fontSize: 28, color: 'white' }}
          valueSuffix="%"

        />
        <View >
          <AppText variant='bold' className="  text-2xl text-white">XP: {xp}/100</AppText>
          <AppText variant='bold' className="text-2xl text-white ">Rank: {rank}</AppText>
          <AppText variant='bold' className=" text-white text-xl">Level: {level}</AppText>
        </View>
      </View>

      {/* Stat Rows */}
      <AppText variant='bold' className="text-xl font-semibold text-start mb-3 text-white">Your Stats</AppText>
      <View className="flex-row flex-wrap justify-between">
        {statEntries.map(([stat, value]) => (
          <View
            key={stat}
            style={{ backgroundColor: lightTheme.background2 }}
            className="w-[48%] flex flex-row items-center justify-between  px-4 py-4 mb-2 rounded-lg"
          >
            <View>
            <AppText variant='bold' className=" text-white text-3xl">{value}</AppText>
            <AppText variant='bold' className="capitalize font-medium text-white">{stat}</AppText>
            </View>
            <View className="flex-row items-center gap-x-2">
              {statIcons[stat]}
            </View>
            {/* <AppText svariant='bold' className=" text-white text-3xl">{value}</AppText>r */}
          </View>
        ))}
      </View>
      {/* <AppButton title='Increase Inteligence' onPress={() => dispatch(increaseStat({ stat: "intelligence", amount: 1 }))} />
      <Button title="Gain 20 XP" onPress={() => dispatch(gainXP(20))} />
      <Button title="Increase Strength" onPress={() => dispatch(increaseStat({ stat: 'karma', amount: 2 }))} /> */}
    </View>
  );
};

export default StatsCard;
