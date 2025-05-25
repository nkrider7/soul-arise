import { View, Text, ImageBackground, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Flame } from 'lucide-react-native'
import { Pressable } from 'react-native'
import { lightTheme } from '~/theme/colors'
import Gem from '~/components/nativewindui/Gem'
import { useAppDispatch, useAppSelector } from '~/src/store/hook/hook'
import { RootState } from '~/src/store'
import AppText from '~/components/universal/AppText'
import AppButton from '~/components/universal/AppButton'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import CustomCounterModal from '../(pages)/add-counter'
import { HabitCounterCard } from '~/components/Habit/HabitCounterCard'
import { updateDailyStatus } from '~/src/store/slices/habitCounterSlice'

export default function Counter() {
	const strike = useAppSelector((state: RootState) => state.player.currentStreak);
	const player = useAppSelector((state: RootState) => state.player);

	  const habitCounters = useAppSelector(state => state.habitCounter.counters)
	  const [isCounterModalVisible, setCounterModalVisible] = useState(false);

	  const dispatch = useAppDispatch();
	return (
		<View style={{ backgroundColor: lightTheme.background }} className='flex-1  items-center'>

			{/* Header  */}
			<View className="flex-row items-center  w-full justify-between px-4 pt-10 pb-3  rounded-t-2xl ">
				{/* Left Icon */}
				<Pressable className='flex items-center flex-row gap-x-1'><Flame size={24} color="yellow" fill={"yellow"} />
					{/* <RotatingSoundButton /> */}
					<AppText variant='bold' className='text-white' >Counter</AppText>

				</Pressable>

				<Pressable className='flex flex-row items-center gap-x-4'>
					<View style={{ backgroundColor: lightTheme.background2 }} className='flex items-center h-8  p-2 px-4 py-0 rounded-2xl flex-row gap-x-1'>
						<Gem />
						{/* <Plus color={'white'} size={14} /> */}
					</View>
					<ImageBackground imageStyle={{ borderRadius: 100, overflow: 'hidden' }} style={{ overflow: "hidden" }} className='rounded-full  ' source={player.character?.backgroundImage} resizeMode="cover" >
						<Image source={player.character?.image} className="w-12 h-12 rounded-2xl" resizeMode="contain" />
					</ImageBackground>
				</Pressable>
			</View>
  <AppButton title="Open Counter Modal" onPress={() => setCounterModalVisible(true)} />



		  <FlatList
			data={habitCounters}
			className='flex px-6  '
			renderItem={({ item }) => (
			  <HabitCounterCard

				title={item.title}
				stat={item.statLinked}
				streak={item.streak}
				maxStreak={item.maxStreak}
				status={item.statusToday}
				icon={item.icons as "hand-fist" | "dumbbell" | "brain" | "seedling" | "flame" | undefined}
				onPress={() => dispatch(updateDailyStatus({ id: item.id, status: 'completed' }))}
			  />
			)}
			keyExtractor={item => item.id}
		  />
		  <BottomSheetModalProvider>
			<CustomCounterModal
			  visible={isCounterModalVisible}
			  onClose={() => setCounterModalVisible(false)}
			/>

		  </BottomSheetModalProvider>





		</View>
	)
}