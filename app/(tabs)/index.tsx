import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import {
  Pressable,
  Button as RNButton,
  View,
} from 'react-native';

import { Container } from '~/components/Container';
import StatsCard from '~/components/Home/statscard';
import { Text } from '~/components/nativewindui/Text';
import { useAppSelector } from '../../src/store/hook/hook';
import AppText from '~/components/universal/AppText';
import { Flame, Icon, UserCircle2, UserRound } from 'lucide-react-native';

export default function Home() {
  const rehydrated = useAppSelector((state: any) => state._persist?.rehydrated);
  useEffect(() => {
    if (rehydrated) {
      AsyncStorage.getItem('persist:root').then(data => {
        const parsed = JSON.parse(data || '{}');
        const player = parsed.player ? JSON.parse(parsed.player) : null;
        console.log('✅ Player slice data (after rehydrate):', player);
      });
    }
  }, []);
  return (
    <>
      <Container>
        <View className='flex-1  items-center'>
          {/* // Header */}
          <View className="flex-row items-center  w-full justify-between px-4 pt-6 pb-3 rounded-t-2xl ">
            {/* Left Icon */}
            <Pressable>
              <Flame size={32} color="yellow" />
            </Pressable>

            {/* Username */}
            <AppText variant='bold' className="text-2xl  text-white">Jinwoo</AppText>

            {/* Right Icon */}
            <Pressable>
              <UserCircle2 size={32} color="white" />
            </Pressable>
          </View>

          
          <StatsCard />
        </View>
      </Container>
    </>
  );
}

