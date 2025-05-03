import { View, Text, Pressable, Settings, Image } from 'react-native'
import React from 'react'
import { Container } from '~/components/Container'
import { Cog, Flame, Settings2, Settings2Icon, SettingsIcon, UserCircle2 } from 'lucide-react-native'
import AppText from '~/components/universal/AppText'

export default function Profiles() {
    return (
        <Container>
            <View className="flex-row items-center  w-full justify-between px-4 pt-6 pb-3 rounded-t-2xl ">
                {/* Left Icon */}
                <Pressable>
                    <Flame size={32} color="yellow" />
                </Pressable>

                {/* Username */}
                <AppText variant='bold' className="text-2xl  text-white">Profile</AppText>

                {/* Right Icon */}
                <Pressable>
                    <Cog size={32} color="white" />
                </Pressable>
            </View>

            <View className="flex-1  items-center">
                <Image source={require('../../assets/Dp.png')}  className='h-40 w-40 '   />
                <AppText variant='bold' className="text-2xl  text-white">Profiles</AppText>
                <AppText variant='bold' className="text-2xl  text-white">Coming Soon</AppText>
            </View>
        </Container>

    )
}