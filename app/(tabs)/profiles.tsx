import { View, Text, Pressable, Settings, Image, FlatList, ImageBackground, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { JSX, useState } from 'react'
import { Container } from '~/components/Container'
import { Brain, Cog, Dumbbell, Flame, Mars, Settings2, Settings2Icon, SettingsIcon, UserCircle2, Venus } from 'lucide-react-native'
import AppText from '~/components/universal/AppText'
import { router } from 'expo-router'
import { HabitCounterCard } from '~/components/Habit/HabitCounterCard'
import { useAppDispatch, useAppSelector } from '~/src/store/hook/hook'
import { updateDailyStatus } from '~/src/store/slices/habitCounterSlice'
import { Button } from '~/components/Button'
import { shopItems } from '~/src/constant/shopItems'
import { earnCoins, earnGems, spendGems } from '~/src/store/slices/currencySlice'
import { addItem } from '~/src/store/slices/inventorySlice'
import AppButton from '~/components/universal/AppButton'
import { RootState } from '~/src/store'
import { lightTheme } from '~/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Profiles() {

    const dispatch = useAppDispatch()
    const habitCounters = useAppSelector(state => state.habitCounter.counters)
    const player = useAppSelector((state: RootState) => state.player);
    const strike = useAppSelector((state: RootState) => state.player.currentStreak);

    const [modalVisible, setModalVisible] = useState(false)
    const { stats, xp, level, rank } = useAppSelector(state => state.player);
    const gems = useAppSelector(state => state.currency.gems);
    const inventory = useAppSelector(state => state.inventory.items);
    const statEntries = Object.entries(stats);
    const statIcons: Record<string, JSX.Element> = {
        strength: (
            <TouchableOpacity>
                <Dumbbell size={32} color="#6366f1" />
            </TouchableOpacity>
        ),
        stamina: (
            <TouchableOpacity>
                <MaterialCommunityIcons name="run" size={32} color="#10b981" />
            </TouchableOpacity>
        ),
        intelligence: (
            <TouchableOpacity >
                <Brain size={32} color="#f59e0b" />
            </TouchableOpacity>
        ),
        karma: (
            <TouchableOpacity >
                <MaterialCommunityIcons name="yin-yang" size={34} color="#ec4899" />
            </TouchableOpacity>
        ),
    };


    return (
        <Container>
            {/* Header */}
            <View className="flex-row items-center  w-full justify-between px-4 pt-6 pb-3 rounded-t-2xl ">
                {/* Left Icon */}
                <Pressable onPress={() => dispatch(earnGems(100))} className='flex flex-row items-center gap-x-1'>
                    <Flame size={24} color="yellow" fill={"yellow"} />
                    <AppText variant='bold' className='text-yellow-400'>{strike} days</AppText>
                </Pressable>

                {/* Right Icon */}
                <Pressable onPress={() => router.push('/(pages)/settings')}>
                    <Cog size={32} color="white" />
                </Pressable>
            </View>

            <View className="flex-1  items-center">

                <View className="items-starta justify-start px-6">
                   <View className='flex-row justify-start gap-x-4 w-full'>
                     <ImageBackground
                        imageStyle={{ borderRadius: 100, overflow: 'hidden', borderColor: lightTheme.secondary, borderWidth: 4 }}
                        style={{ overflow: "hidden" }}
                        className='rounded-full'
                        source={player.character?.backgroundImage}
                        resizeMode="cover"
                    >
                        <Image source={player.character?.image} className="w-32 h-32 rounded-2xl" resizeMode="contain" />
                    </ImageBackground>
                    <View>
                        <AppText variant='bold' className="text-white text-3xl mt-2 ">{player.character?.name}</AppText>
                    <View className=" flex-row items-center gap-x-2">{player.character?.gender === 'female' ? <Venus color="pink" /> : <Mars color="#5865F2" />}<AppText variant='bold' className='text-white text-lg '>{player.character?.gender}</AppText></View>
                    <AppText variant='bold' className="text-white text-sm mt-2 ">Hello, I am a programmmer</AppText>

                    </View>
                   </View>


                    <View className="flex-row flex-wrap gap-y-1 justify-between mt-4">
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
                                    {statIcons.hasOwnProperty(stat) ? statIcons[stat] : <Text style={{ color: 'white' }}>?</Text>}

                                </View>
                                {/* <AppText svariant='bold' className=" text-white text-3xl">{value}</AppText>r */}
                            </View>
                        ))}
                    </View>
                </View>
            </View>


            <FlatList
                data={inventory}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="p-4 bg-gray-700 rounded-lg mb-2">
                        <Text className="text-white text-xl">{item.name}</Text>
                        <Text className="text-gray-400">{item.description}</Text>
                    </View>
                )}
            />




            {/* <FlatList
                data={habitCounters}
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
            <CustomCounterCreator /> */}


        </Container>

    )
}