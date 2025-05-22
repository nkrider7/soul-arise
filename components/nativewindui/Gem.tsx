import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useAppSelector } from '~/src/store/hook/hook';
import AppText from '../universal/AppText';

export default function Gem() {

    const gems = useAppSelector(state => state.currency.gems);
    return (
        <Pressable onPress={() => console.log("hasdsa")} className='flex-row  items-center gap-x-2'>
            <AppText variant='bold' className='text-white' >{gems}</AppText>
            <Image source={require('../../assets/inventory/gem.png')} resizeMode='cover' className="w-4 h-4" />
        </Pressable>
    )
}



export const GemIcon = () => {
    return (
        <Image
            source={require('../../assets/inventory/gem.png')}
            resizeMode='cover'
            className="w-4 h-4"
        />
    );
}