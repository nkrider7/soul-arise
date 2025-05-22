import { View,Image } from 'react-native';
import AppText from './AppText';
import { lightTheme } from '~/theme/colors';
import { ActivityIndicator } from '../nativewindui/ActivityIndicator';

const SplashScreenAnimtion = () => {

  return (
    <View className="flex-1 items-center justify-center bg-black">
     
        <Image source={require('../../assets/icon.png')} className='h-52 w-52 rounded-xl' resizeMode='cover' />
        <AppText variant='bold' className="text-white text-2xl text-center">Wake up!</AppText>
        <AppText variant='bold' className="text-white text-4xl text-center">to <AppText variant='bold' style={{ color:lightTheme.secondary}}>Reality!</AppText></AppText>
        <ActivityIndicator className='mt-10 ' size={50}   color={lightTheme.secondary} />
    </View>
  );
};

export default SplashScreenAnimtion;
