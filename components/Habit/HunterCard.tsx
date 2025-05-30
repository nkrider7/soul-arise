import React from 'react';
import { View, Text, Image, ImageSourcePropType, ImageBackground } from 'react-native';
import AppText from '../universal/AppText';
import { lightTheme } from '~/theme/colors';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  name: string;
  image: ImageSourcePropType;
  rank: string;
  power: string;
  description: string;
}

const HunterCard = ({ name, image, rank, power, description }: Props) => {
  return (
    <ImageBackground className="  bg-white  rounded-xl p-4  shadow-lg">
      {/* Header */}
      {/* <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white font-bold text-xs">Official Hunter's License</Text>
        <Text className="text-blue-400 font-bold text-xs">RANK {rank}</Text>
      </View> */}

      {/* Avatar */}
      <View className='flex-row gap-x-2'>
        <View className="items-center ">
          <Image
            source={image}
            className="w-20 h-20 rounded-md bg-slate-400 border border-white"
            resizeMode="cover"
          />
        </View>

        {/* Info */}
        <View className="items-start ">
          <AppText variant='bold' className="text-black  text-lg">{name}</AppText>

          {/* <Text className="text-gray-300 text-[10px] text-center">{description}</Text> */}
          <AppText className="text-lime-800 text-xs mt-1"><FontAwesome5 name="bolt" size={16} color=" #3f6212" /> {power}</AppText>

          <View className="flex-row  justify-between w-48 items-center gap-x-2 mt-1">
            <Image source={require('../../assets/icons/sim.webp')} className="w-12 h-12 " resizeMode="contain" /> 
            <View className="items-center space-y-1">
              <AppText variant='bold' className='text-2xl text-black'>{rank}</AppText>
              <AppText variant='bold' className="text-black  ">Rank</AppText>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="border-t border-gray-700 mt-4 pt-2 items-center">
        <AppText variant='semibold' className="text-gray-800 text-xs text-center">
          Issued by Soul Hunter Association
        </AppText>
      </View>
    </ImageBackground>
  );
};

export default HunterCard;
