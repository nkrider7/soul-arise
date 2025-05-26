import { View, Text, Pressable, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Container } from '~/components/Container'
import { Cog, Flame, Mars, Venus } from 'lucide-react-native'
import AppText from '~/components/universal/AppText'
import { router } from 'expo-router'
import { useAppDispatch, useAppSelector } from '~/src/store/hook/hook'
import { earnGems } from '~/src/store/slices/currencySlice'
import { RootState } from '~/src/store'
import { lightTheme } from '~/theme/colors'

import { statIcons } from '~/src/constant/Icons'

export default function Profiles() {

    const dispatch = useAppDispatch()
    const player = useAppSelector((state: RootState) => state.player);
    const strike = useAppSelector((state: RootState) => state.player.currentStreak);
    const { stats, xp, level, rank } = useAppSelector(state => state.player);
    const gems = useAppSelector(state => state.currency.gems);
    const inventory = useAppSelector(state => state.inventory.items);
    const statEntries = Object.entries(stats);

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
                        <Pressable onPress={() => router.push('/AvatarSlection')}>
                            <ImageBackground
                                imageStyle={{ borderRadius: 100, overflow: 'hidden' }}
                                style={{ overflow: "hidden" }}
                                className='rounded-full'
                                source={player.character?.backgroundImage}
                                resizeMode="cover"
                            >
                                <Image source={player.character?.image} className="w-32 h-32 rounded-2xl" resizeMode="contain" />
                            </ImageBackground>
                        </Pressable>
                        <View>
                            <AppText variant='bold' className="text-white text-3xl mt-2 ">{player.character?.name}</AppText>
                            <View className=" flex-row items-center gap-x-2">{player.character?.gender === 'female' ? <Venus color="pink" /> : <Mars color="#5865F2" />}<AppText variant='bold' className='text-white text-lg '>{player.character?.gender}</AppText></View>
                            <AppText variant='semibold' className="text-lime-500 text-xs mt-1">
                                Powers: {player.character?.powers && player.character.powers.length > 0 ? player.character.powers.join(', ') : 'Unknown'}
                            </AppText>

                            <AppText variant='bold' className="text-white w-48 text-sm mt-2 ">{player.character?.description}</AppText>

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

                    <AppText variant="bold" className="text-white text-3xl">
                        Inventory
                    </AppText>

                </View>
            </View>

        </Container>

    )
}