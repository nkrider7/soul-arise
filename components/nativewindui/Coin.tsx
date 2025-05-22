import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useAppSelector } from '~/src/store/hook/hook';
import AppText from '../universal/AppText';

export default function Coin() {

    const coins = useAppSelector(state => state.currency.coins);
    return (
        <Pressable onPress={() => console.log("hasdsa")} className='flex-row  items-center gap-x-2'>
            <AppText variant='bold' className='text-white' >{coins}</AppText>
            <Image source={require('../../assets/inventory/coin.png')} resizeMode='cover' className="w-8 h-8" />
        </Pressable>
    )
}



export const CoinIcon = () => {
    return (
        <Image
            source={require('../../assets/inventory/coin.png')}
            resizeMode='cover'
            className="w-8 h-8"
        />
    );
}