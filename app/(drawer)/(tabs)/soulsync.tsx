import { BowArrow, Ghost, MessagesSquare, User2 } from 'lucide-react-native';
import { View, Text, Image, ImageBackground, Pressable, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import AppText from '~/components/universal/AppText';
import { Avatars } from '~/lib/Avtar';
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { lightTheme } from '~/theme/colors';

const { width, height } = Dimensions.get('window');

export default function Hunt() {
  const CARD_DATA = [
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },
    {
      id: 1, 
      text: 'Card 1',
      url: 'https://cdn.dribbble.com/userupload/17254646/file/original-391be81661c5efe8d45cba9e3da0cf4f.png?format=webp&resize=400x300&vertical=center'
    },

  ];
  return (
    <View className="flex-1 bg-   items-center pt-12">
      <View className="flex-row items-center elevation-lg  justify-between  w-full px-4  mb-4">
        <Pressable className='flex' >
          <Image source={require('../../../assets/icons/soullink.png')} className="w-10 h-10 m-1" resizeMode="contain" />
        </Pressable>

        <View>
          <AppText variant="bold" className="text-2xl text-white">Soul Sync</AppText>
        </View>
        <Pressable>
          <MessagesSquare size={28} color="white" />
        </Pressable>
      </View>

      <View className='w-full h-full flex items-center justify-center'>
       <Swiper
        cards={CARD_DATA}
        renderCard={(card) => (
          <View style={styles.card}>
                 <ImageBackground source={{ uri: card.url }} className='w-60 h-80 rounded-xl' imageStyle={{ borderRadius: 20, overflow: 'hidden', }} style={{ overflow: 'hidden' }} resizeMode="cover"></ImageBackground>
          </View>
        )}
        onSwiped={(cardIndex) => {
          console.log(`Swiped card at index: ${cardIndex}`);
        }}
        onSwipedAll={() => {
          console.log('All cards swiped');
        }}
        cardIndex={0}
        backgroundColor={lightTheme.background}
        stackSize={3}
      />
   </View>

    </View>
  );
}



const styles = StyleSheet.create({

  card: {
    width: width * 0.8,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
});