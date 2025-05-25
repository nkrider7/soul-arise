import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Button as RNButton,
  ScrollView,
  View,
} from 'react-native';
import StatsCard from '~/components/Home/statscard';
import { useAppDispatch, useAppSelector } from '../../../src/store/hook/hook';
import AppText from '~/components/universal/AppText';
import { Flame, Icon, Plus, UserCircle2, UserRound } from 'lucide-react-native';
import { RootState } from '~/src/store';
import PagerView from 'react-native-pager-view';
import { router } from 'expo-router';
import AppButton from '~/components/universal/AppButton';
import { lightTheme } from '~/theme/colors';
import { loadSound, playSound, stopSound, unloadAllSounds } from '~/src/utils/AudioManager';
import { useEffect, useRef, useState } from 'react';
import { soundFiles } from '~/src/utils/soundFiles';
import RotatingSoundButton from '~/components/universal/RotatingSoundButton';
import Gem from '~/components/nativewindui/Gem';
import Coin from '~/components/nativewindui/Coin';
import RewardModalCoins from '~/components/universal/RewardCoin';
import SplashScreenAnimtion from '~/components/universal/SpashScreen';
import { HabitCounterCard } from '~/components/Habit/HabitCounterCard';
import { updateDailyStatus } from '~/src/store/slices/habitCounterSlice';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomCounterModal from '../../(pages)/add-counter';
import { DrawerActions, useNavigation } from '@react-navigation/native';


export default function Home() {
  // const hasLoaded = useRef(false);
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   if (hasLoaded.current) return;
  //   hasLoaded.current = true;

  //   const loadAudio = async () => {
  //     await loadSound('click', soundFiles.click);
  //     await loadSound('bgm', soundFiles.bgm);
  //   };

  //   loadAudio();

  //   return () => {
  //     unloadAllSounds();
  //   };
  // }, []);
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.currency.coins);
  const gems = useAppSelector((state: RootState) => state.currency.gems);
  const strike = useAppSelector((state: RootState) => state.player.currentStreak);
  const player = useAppSelector((state: RootState) => state.player);
  // console.log(player.acceptedChallenges)

  const banners = [
	{
	  text: `Welcome back, ${player.character?.name}!`,
	  subtext: "Ready to hunt some monsters?",
	  image: require('../../../assets/avatars/choiJongin.png'),
	  background: require('../../../assets/banner/main.jpg'),
	},
	{
	  text: "Daily Quests Await!",
	  subtext: "Don’t miss your rewards.",
	  image: require('../../../assets/avatars/choiJongin.png'),
	  background: require("../../../assets/banner/inferno_slice_thumb.jpg"),
	},
  ];






  return (
	<>
	  <View style={{ backgroundColor: lightTheme.background }} className='flex-1  items-center'>
	  
		{/* Header  */}
		<View className="flex-row items-center  w-full justify-between px-4 pt-10 pb-3  rounded-t-2xl ">
		  {/* Left Icon */}
		  <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} className='flex items-center flex-row gap-x-1'><Flame size={24} color="yellow" fill={"yellow"} />
			<AppText variant='bold' className='text-yellow-400'>{strike} days</AppText></Pressable>
		  {/* <RotatingSoundButton /> */}

		  <Pressable onPress={() => router.push('/(drawer)/(tabs)/profiles')} className='flex flex-row items-center gap-x-4'>
			<View style={{ backgroundColor: lightTheme.background2 }} className='flex items-center h-8  p-2 px-4 py-0 rounded-2xl flex-row gap-x-1'>
			  <Gem />
			  {/* <Plus color={'white'} size={14} /> */}
			</View>
			<ImageBackground imageStyle={{ borderRadius: 100, overflow: 'hidden' }} style={{ overflow: "hidden" }} className='rounded-full  ' source={player.character?.backgroundImage} resizeMode="cover" >
			  <Image source={player.character?.image} className="w-12 h-12 rounded-2xl" resizeMode="contain" />
			</ImageBackground>
		  </Pressable>
		</View>
		<ScrollView className='w-full '>
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
		  <View className='flex-row'>
			<AppButton
			  onPress={() => setVisible(true)}
			  variant="success"
			  size="sm"
			  title="sm"
			/>
			<AppButton variant='secondary' size='sm' onPress={() => router.push('/(onboard)/challenges')} title='challenge' />
			<View >

			</View>
		  </View>
		
		  <RewardModalCoins visible={visible} onClose={() => setVisible(false)} />
		</ScrollView>
	  </View>

	</>
  );
}

