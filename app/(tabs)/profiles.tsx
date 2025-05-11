import { View, Text, Pressable, Settings, Image, FlatList, ImageBackground, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Container } from '~/components/Container'
import { Cog, Flame, Settings2, Settings2Icon, SettingsIcon, UserCircle2 } from 'lucide-react-native'
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

export default function Profiles() {

    const dispatch = useAppDispatch()
    const habitCounters = useAppSelector(state => state.habitCounter.counters)

    const avatarOptions = [
        require('../../assets/avatars/avtar1.png'),
        require('../../assets/avatars/avtar2.png'),
    ]

    const backgroundOptions = [
        require('../../assets/bg1.jpg'),
        require('../../assets/dgbg.jpg'),

    ]
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[1])
    const [selectedBg, setSelectedBg] = useState(backgroundOptions[2])

    // Removed duplicate declaration of dispatch
    const gems = useAppSelector(state => state.currency.gems);
    const inventory = useAppSelector(state => state.inventory.items);

    return (
        <Container>
            {/* Header */}
            <View className="flex-row items-center  w-full justify-between px-4 pt-6 pb-3 rounded-t-2xl ">
                {/* Left Icon */}
                <Pressable onPress={() => dispatch(earnGems(100))}>
                    <Flame size={32} color="yellow" />
                </Pressable>

                {/* Username */}
                <AppText variant='bold' className="text-2xl  text-white">Profile gem {gems}</AppText>

                {/* Right Icon */}
                <Pressable onPress={() => router.push('/(pages)/settings')}>
                    <Cog size={32} color="white" />
                </Pressable>
            </View>

            <View className="flex-1  items-center">

                <View className="items-center justify-center px-6">
                    <ImageBackground
                        imageStyle={{ borderRadius: 100, overflow: 'hidden' }}
                        style={{ overflow: "hidden" }}
                        className='rounded-full'
                        source={selectedBg}
                        resizeMode="cover"
                    >
                        <Image source={selectedAvatar} className="w-28 h-28 rounded-2xl" resizeMode="contain" />
                    </ImageBackground>

                    <Text className="text-white text-xl font-bold">Sung Jinwoo</Text>
                    <Pressable
                        className="mt-4 px-4 py-2 bg-white rounded-full"
                        onPress={() => setModalVisible(true)}
                    >
                        <Text className="text-black font-bold">Switch Avatar</Text>
                    </Pressable>

                </View>
            </View>
            <AppButton title='earngem' onPress={() => dispatch(earnGems(100))} />
            
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black bg-opacity-80 justify-center items-center px-4">
                    <View className="bg-white rounded-xl p-4 w-full max-w-md">
                        <Text className="text-lg font-bold mb-2 text-center">Choose Avatar</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                            {avatarOptions.map((img, index) => (
                                <TouchableOpacity key={index} onPress={() => setSelectedAvatar(img)}>
                                    <Image source={img} className="w-20 h-20 mx-2 rounded-full" resizeMode="cover" />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text className="text-lg font-bold mb-2 text-center">Choose Background</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {backgroundOptions.map((bg, index) => (
                                <TouchableOpacity key={index} onPress={() => setSelectedBg(bg)}>
                                    <Image source={bg} className="w-24 h-16 mx-2 rounded-lg" resizeMode="cover" />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Pressable
                            className="mt-4 bg-black py-2 rounded-lg"
                            onPress={() => setModalVisible(false)}
                        >
                            <Text className="text-white text-center font-bold">Done</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </Container>

    )
}