import React from 'react';
import { View, Text, Image, ImageSourcePropType, ImageBackground } from 'react-native';
import AppText from '../universal/AppText';

interface Props {
  name: string;
  image: ImageSourcePropType;
  rank: string;
  power: string;
  description: string;
}

const HunterCard = ({ name, image, rank, power, description }: Props) => {
  return (
    <ImageBackground  source={require('../../assets/frame.png')} className="  rounded-xl p-4 border  bg-purple-950 shadow-lg">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white font-bold text-xs">Official Hunter's License</Text>
        <Text className="text-blue-400 font-bold text-xs">RANK {rank}</Text>
      </View>

      {/* Avatar */}
      <View className="items-center mb-3">
        <Image
          source={image}
          className="w-28 h-28 rounded-md bg-slate-400 border border-white"
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View className="items-center space-y-1">
		<AppText variant='bold' className='text-4xl text-white'>{rank}</AppText>
        <Text className="text-white font-bold ">Rank</Text>
        <Text className="text-white font-bold text-lg">{name}</Text>
        <Text className="text-gray-300 text-[10px] text-center px-2">{description}</Text>
        <Text className="text-green-400 text-sm mt-1">Power: {power}</Text>
      </View>

      {/* Footer */}
      <View className="border-t border-gray-700 mt-4 pt-2 items-center">
        <Text className="text-gray-400 text-xs text-center">
          Issued by Korea Hunter Association
        </Text>
      </View>
    </ImageBackground>
  );
};

export default HunterCard;
