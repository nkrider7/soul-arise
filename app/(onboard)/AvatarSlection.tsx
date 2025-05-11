import { Mars, Venus } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { Avatars } from '~/lib/Avtar';

const { width } = Dimensions.get('window');

export default function AvatarSelectScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const activeCharacter = Avatars[activeIndex];

  const handleSelectCharacter = (index: number) => {
    setActiveIndex(index);
    pagerRef.current?.setPage(index); // sync pager to selected grid character
  };

  const renderGridItem = ({ item, index }: { item: { image: any }; index: number }) => (
    <TouchableOpacity
      onPress={() => handleSelectCharacter(index)}
      className={`w-[22%] aspect-square m-1.5 rounded-xl overflow-hidden ${index === activeIndex ? 'border-2 border-white' : 'border border-gray-600'
        }`}
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
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}

      >
        {Avatars.map((char, i) => (
          <ImageBackground
            key={i}
            source={require('../../assets/dgbg.jpg')} // add this field to your avatar data
            className=""

          >
            <ImageBackground
              key={i}
              source={char.fullCharacterImage} // add this field to your avatar data
              className="flex-1 items-center  justify-end pb-10 "
              resizeMode="cover"
            >
              {/* Avatar Circle */}
              {/* <View className="absolute bottom-[-10px] w-28 h-28 rounded-full border-4 border-white bg-neutral-800 overflow-hidden z-10">
              <Image source={char.image} className="w-full h-full" resizeMode="cover" />
            </View>
             */}
            </ImageBackground>
          </ImageBackground>
        ))}
        {/* Character Info */}

      </PagerView>

      <View className="items-center flex flex-row  gap-x-4 mb-4 p-4">
        <View className=" w-28 h-28 rounded-full border-4 border-white bg-neutral-800 overflow-hidden z-10">
          <Image source={activeCharacter.image} className="w-full h-full" resizeMode="cover" />
        </View>
       <View>
       <Text className="text-white text-2xl font-bold flex justify-center items-center">{activeCharacter.gender === 'female'? <Venus color={"pink"} /> : <Mars color={"#5865F2"} /> } {activeCharacter.name}</Text>
        <Text className="text-gray-300 text-sm mt-1">
          Powers: {activeCharacter.powers.length > 0 ? activeCharacter.powers.join(', ') : 'Unknown'}
        </Text>
        <Text className="text-gray-400 text-xs mt-0.5">
          Rank: {activeCharacter.rankLevel || 'Unranked'}
        </Text>
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
