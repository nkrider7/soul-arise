import {
  Button as RNButton,
  View,
} from 'react-native';

import { Container } from '~/components/Container';
import { Text } from '~/components/nativewindui/Text';

export default function Home() {
  return (
    <>
      <Container>
        <View className='flex-1  justify-center items-center'>
          <Text className='text-3xl font-semibold'>Solo Arise</Text>
        </View>
      </Container>
    </>
  );
}

