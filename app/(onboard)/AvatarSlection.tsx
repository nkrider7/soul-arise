import {  Mars, SquarePen, Venus } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import {
  View,
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
      className={`w-[22%] aspect-square m-1.5 rounded-xl overflow-hidden ${index === activeIndex ? 'border-2 border-white' : 'border border-gray-600'
        } ${item.gender === 'male' ? 'bg-cyan-400' : 'bg-purple-600'}`}
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

      <View className="items-start flex flex-row gap-x-4 mb-4 p-4">
        <View className='flex items-center gap-y-2'>
          <ImageBackground
            imageStyle={{ borderRadius: 100, overflow: 'hidden' }}
            source={activeCharacter.backgroundImage}
            className="w-28 h-28 rounded-full border-4 border-white  overflow-hidden z-10">
            <Image source={activeCharacter.image} className="w-full h-full" resizeMode="cover" />
          </ImageBackground>
          <Button
            size={'md'}
            className="bg-teal-400 w-20 mt-2 border-2  border-teal-500"
            onPress={() => {
              dispatch(
                selectCharacter({
                  ...activeCharacter,
                  name: customName.trim() || activeCharacter.name, // Save custom name
                  gender: activeCharacter.gender as 'male' | 'female' | 'other',
                  image: activeCharacter.image,
                  fullCharacterImage: activeCharacter.fullCharacterImage,
                  backgroundImage: activeCharacter.backgroundImage,
                  description: activeCharacter.description,
                  powers: activeCharacter.powers
                })
              );
              router.navigate('/(onboard)/challenges');
            }}
          >
            <AppText variant='bold' className="text-sm text-teal-100">Save</AppText>
          </Button>
        </View>
        <View className="flex-1">
          {/* Editable Name */}
          <View style={{ position: 'relative' }}>
            <TextInput
              value={customName}
              onChangeText={setCustomName}
              placeholder="Enter name"
              placeholderTextColor="#ccc"
              style={{
                backgroundColor: lightTheme.background2,
                fontFamily: 'Bold',
                paddingRight: 40, // space for the icon
              }}
              className="text-white w-fit rounded-lg pl-3 p-2 text-xl mb-1 border-b"
            />

            <TouchableOpacity
              onPress={() => console.log('Icon pressed')}
              style={{ position: 'absolute', right: 10, top: '20%' }}
            >
              <SquarePen size={18} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center">
            <AppText variant='normal' className="text-white text-lg">{activeCharacter.gender === 'female' ? <Venus color="pink" /> : <Mars color="#5865F2" />}</AppText><AppText variant='bold' className="text-white text-lg ml-2">{activeCharacter.gender}</AppText>
            <AppText variant='bold' className=" text-lime-400 text-lg ml-4  mt-0.5">
              Rank: {activeCharacter.rankLevel || '?'}
            </AppText>
          </View>

          <AppText variant='semibold' className="text-teal-500 text-xs mt-1">
            Powers: {activeCharacter.powers.length > 0 ? activeCharacter.powers.join(', ') : 'Unknown'}
          </AppText>

          <AppText variant='semibold' className="text-white text-xs mt-1">
            Bio: {activeCharacter.description ||  'Unknown'}
          </AppText>


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
