import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import {
  Button as RNButton,
  View,
} from 'react-native';

import { Container } from '~/components/Container';
import StatsCard from '~/components/Home/statscard';
import { Text } from '~/components/nativewindui/Text';
import { useAppSelector } from '../../src/store/hook/hook';

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
        <View className='flex-1  justify-center items-center'>
          <Text className='text-3xl font-semibold'>Solo Arise</Text>
          <StatsCard />
        </View>
      </Container>
    </>
  );
}

