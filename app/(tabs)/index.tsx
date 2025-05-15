import {
  Image,
  ImageBackground,
  Pressable,
  Button as RNButton,
  View,
} from 'react-native';
import { Container } from '~/components/Container';
import StatsCard from '~/components/Home/statscard';
import { useAppDispatch, useAppSelector } from '../../src/store/hook/hook';
import AppText from '~/components/universal/AppText';
import { Flame, Icon, UserCircle2, UserRound } from 'lucide-react-native';
import { RootState } from '~/src/store';
import PagerView from 'react-native-pager-view';
import { router } from 'expo-router';
import AppButton from '~/components/universal/AppButton';
import { takeChallenge } from '~/src/store/slices/questSlice';
import { Button } from '~/components/nativewindui/Button';
import { lightTheme } from '~/theme/colors';
import { auth } from '~/src/config/firebase';


export default function Home() {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.currency.coins);
  const gems = useAppSelector((state: RootState) => state.currency.gems);
  const strike = useAppSelector((state: RootState) => state.player.currentStreak);
  const challenge = useAppSelector((state: RootState) => state.player.acceptedChallenges);
  const player = useAppSelector((state: RootState) => state.player);

  const banners = [
    {
      text: `Welcome back, ${player.character?.name}!`,
      subtext: "Ready to hunt some monsters?",
      image: require('../../assets/avatars/choiJongin.png'),
      background: require('../../assets/banner/main.jpg'),
    },
    {
      text: "Daily Quests Await!",
      subtext: "Don’t miss your rewards.",
      image: require('../../assets/avatars/choiJongin.png'),
      background: require("../../assets/banner/inferno_slice_thumb.jpg"),
    },
  ];

const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <>
        <View style={{backgroundColor:lightTheme.background}} className='flex-1  items-center'>
          <View className="flex-row items-center  w-full justify-between px-4 pt-10 pb-3  rounded-t-2xl ">
            {/* Left Icon */}
            <Pressable className='flex-row items-center text-xl justify-center gap-x-1'>
              <Flame size={24} color="yellow" fill={"yellow"} />
              <AppText variant='bold' className='text-yellow-400'>{strike} days</AppText>

            </Pressable>

            <Pressable onPress={() => router.push('/AvatarSlection')}>
              <ImageBackground imageStyle={{ borderRadius: 100, overflow: 'hidden' }} style={{ overflow: "hidden" }} className='rounded-full  ' source={player.character?.backgroundImage} resizeMode="cover" >
                <Image source={player.character?.image} className="w-12 h-12 rounded-2xl" resizeMode="contain" />
              </ImageBackground>
            </Pressable>
          </View>
          <PagerView
            style={{ height: 160, width: '100%' }}
            initialPage={0}
            onPageSelected={(e) => console.log('Selected page:', e.nativeEvent.position)}
          >
            {banners.map((banner, index) => (
              <View key={index} className='w-full px-4 h-40 rounded-2xl'>
                <ImageBackground
                  source={banner.background}
                  className='w-full h-full rounded-2xl'
                  imageStyle={{ borderRadius: 20, overflow: 'hidden', opacity: 0.6 }}
                  style={{ overflow: 'hidden' }}
                  resizeMode="cover"
                >
                  <View className='flex-1 justify-end px-4 py-2'>
                    <AppText variant='bold' className='text-white text-2xl'>{banner.text}</AppText>
                    <AppText variant='semibold' className='text-white text-sm'>{banner.subtext}</AppText>
                  </View>
                  <View className='absolute -bottom-12 -right-14 overflow-hidden'>
                    <Image source={banner.image} className="w-64 h-64 rounded-2xl" resizeMode="contain" />
                  </View>
                </ImageBackground>
              </View>
            ))}

          </PagerView>
          <StatsCard />
        
          {/* <AppButton onPress={() => router.push('/(pages)/Shop')} className='w-11/12 mt-4' title='Shop' /> */}
          <View className='flex-row'> <AppButton variant='success' size='sm' title='sm' />
            <AppButton variant='secondary' size='sm' onPress={() => router.push('/(onboard)/challenges')} title='challenge' />
            <AppButton variant='danger' size='sm' title='hard' />
            <AppButton onPress={handleLogout} variant='primary' size='sm' title='logut' />
          </View>
        </View>

    </>
  );
}

