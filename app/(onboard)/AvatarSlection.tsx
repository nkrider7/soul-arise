import { Mars, Venus } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { Button } from '~/components/nativewindui/Button';
import AppText from '~/components/universal/AppText';
import { Avatars } from '~/lib/Avtar';
import { useDispatch } from 'react-redux';
import { selectCharacter } from '~/src/store/slices/playerSlice';
import { router } from 'expo-router';
import { lightTheme } from '~/theme/colors';

const { width } = Dimensions.get('window');

export default function AvatarSelectScreen() {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [customName, setCustomName] = useState(Avatars[0].name); // <-- New state
  const pagerRef = useRef<PagerView>(null);
  const activeCharacter = Avatars[activeIndex];

  const handleSelectCharacter = (index: number) => {
    setActiveIndex(index);
    setCustomName(Avatars[index].name); // Reset custom name when avatar changes
    pagerRef.current?.setPage(index);
  };

  const renderGridItem = ({ item, index }: { item: { image: any, gender: string }; index: number }) => (
    <TouchableOpacity
      onPress={() => handleSelectCharacter(index)}
      className={`w-[22%] aspect-square m-1.5 rounded-xl overflow-hidden ${
        index === activeIndex ? 'border-2 border-white' : 'border border-gray-600'
      } ${item.gender === 'male' ? 'bg-teal-500' : 'bg-purple-600'}`}
    >
      <Image source={item.image} className="w-full h-full" resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black mb-2">
      {/* Swipeable Character Background */}
      <PagerView
        ref={pagerRef}
        style={{ height: 400, overflow: 'visible', paddingBottom: 20 }}
        initialPage={0}
        onPageSelected={(e) => handleSelectCharacter(e.nativeEvent.position)}
      >
        {Avatars.map((char, i) => (
          <ImageBackground
            key={i}
            source={char.backgroundImage}
            className="pt-10"
          >
            <ImageBackground
              source={char.fullCharacterImage}
              className="flex-1 items-center justify-end pb-10"
              resizeMode="cover"
            />
          </ImageBackground>
        ))}
      </PagerView>

      <View className="items-center flex flex-row gap-x-4 mb-4 p-4">
        <View className="w-28 h-28 rounded-full border-4 border-white bg-white overflow-hidden z-10">
          <Image source={activeCharacter.image} className="w-full h-full" resizeMode="cover" />
        </View>

        <View className="flex-1">
          {/* Editable Name */}
          <TextInput
            value={customName}
            onChangeText={setCustomName}
            placeholder="Enter name"
            placeholderTextColor="#ccc"
            style={{backgroundColor:lightTheme.background2, textDecorationStyle: 'dashed'}}
            className="text-white w-48 text-2xl no-underline font-bold mb-1 border-b border-gray-400"
          />
          
          <View className="flex flex-row items-center">
            <AppText variant='normal' className="text-white text-lg">{activeCharacter.gender === 'female' ? <Venus color="pink" /> : <Mars color="#5865F2" />}</AppText>
          </View>

          <AppText variant='normal' className="text-gray-300 text-sm mt-1">
            Powers: {activeCharacter.powers.length > 0 ? activeCharacter.powers.join(', ') : 'Unknown'}
          </AppText>
          <AppText variant='bold' className="text-gray-400 text-xs mt-0.5">
            Rank: {activeCharacter.rankLevel || 'Unranked'}
          </AppText>

          <Button
            size={'sm'}
            className="bg-teal-400 w-20 mt-2 border-2 rounded-lg border-teal-500"
            onPress={() => {
              dispatch(
                selectCharacter({
                  ...activeCharacter,
                  name: customName.trim() || activeCharacter.name, // Save custom name
                  gender: activeCharacter.gender as 'male' | 'female' | 'other',
                })
              );
              router.navigate('/(onboard)/challenges');
            }}
          >
            <AppText variant='bold' className="text-sm text-teal-100">Next</AppText>
          </Button>
        </View>
      </View>

      {/* Character Grid */}
      <FlatList
        data={Avatars}
        renderItem={renderGridItem}
        keyExtractor={(_, idx) => idx.toString()}
        numColumns={4}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
