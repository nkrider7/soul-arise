import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';

// Static images must be imported, cannot use dynamic strings with require
const characters = [
  {
    name: 'Sung Jinwoo',
    image: require('../../assets/avatars/avtar1.png'),
    powers: ['invisibility', 'double strike'],
    gender: 'male',
    description: '',
  },
  {
    name: 'Fushiguro',
    image: require('../../assets/avatars/avtar2.png'),
    powers: ['ice blast', 'shield'],
    gender: 'male',
    description: '',
  },
];

export default function Hunt() {
  return (
    <View className="flex-1 bg-black pt-12">
      <Text className="text-white text-2xl text-center mb-4">Choose Your Character</Text>
      
      <PagerView style={{ flex: 1 }} initialPage={1}>
        {characters.map((char, index) => (
         
          <View key={index} className="items-center justify-center px-6">
            <ImageBackground imageStyle={{borderRadius:100, overflow:'hidden'}} style={{overflow:"hidden"}} className='rounded-full  ' source={require('../../assets/dgbg.jpg')} resizeMode="cover" >
            <Image source={char.image} className="w-28 h-28 rounded-2xl" resizeMode="contain" />
            </ImageBackground>
            <Text className="text-white text-xl font-bold">{char.name}</Text>
            <Text className="text-white text-sm mt-1">Powers: {char.powers.join(', ')}</Text>
          </View>
     
        ))}
      </PagerView>
    </View>
  );
}
