import React, { useState } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Container } from '~/components/Container';
import { ExploreHeader } from '~/components/universal/AppHeader';
import AppText from '~/components/universal/AppText';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import { lightTheme } from '~/theme/colors';

type Anime = {
  id: string;
  title: string;
  image: string;
};

const animeData: Anime[] = [
  { id: '1', title: 'Naruto', image: 'https://example.com/naruto.jpg' },
  { id: '2', title: 'One Piece', image: 'https://example.com/onepiece.jpg' },
  { id: '3', title: 'Attack on Titan', image: 'https://example.com/aot.jpg' },
  { id: '5', title: 'Demon Slayer', image: 'https://example.com/aot.jpg' },
  { id: '6', title: 'Demon Slayer', image: 'https://example.com/aot.jpg' },
  { id: '7', title: 'Demon Slayer', image: 'https://example.com/aot.jpg' },
  { id: '8', title: 'Demon Slayer', image: 'https://example.com/aot.jpg' },
  { id: '9', title: 'Demon Slayer', image: 'https://example.com/aot.jpg' },
  { id: '12', title: 'Demon Slayer', image: 'https://example.com/aot.jpg' },
  { id: '14', title: 'Demon Slayer', image: 'https://example.com/aot.jpg' },
];

const category = [
  {
    name: 'sci fi',
    url: 'https://cdn.dribbble.com/userupload/18419650/file/original-823ac367d3d411a5291b650be9eddde2.png',
  },
  {
    name: 'fantasy',
    url: 'https://cdn.dribbble.com/userupload/16673346/file/original-e2b0deb299b3e69831bb371c66a04a51.png',
  },
  {
    name: 'horror',
    url: 'https://cdn.dribbble.com/userupload/43437034/file/original-c08c6b67238620bc6900f6e8c23ccfb4.jpg',
  },
  {
    name: 'adventure',
    url: 'https://cdn.dribbble.com/userupload/18195866/file/original-8655ca3be6dbd56cab60fc33fe402286.png',
  },
];

const renderItem = ({ item }: LegendListRenderItemProps<Anime>) => (
  <View style={{backgroundColor:lightTheme.background2}} className=" rounded-xl shadow-md p-4 mb-4 flex-row items-center">
    <Image
      source={{ uri: item.image }}
      className="w-16 h-16 rounded-lg mr-4"
      resizeMode="cover"
    />
    <AppText  variant='bold' className="text-lg font-semibold text-white">{item.title}</AppText>
  </View>
);

export default function Explore() {
  const [showCategories, setShowCategories] = useState(true);

  const opacity = useSharedValue(1);
  const height = useSharedValue(130); // Adjusted for ~h-32 + padding

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: height.value,
    backgroundColor: lightTheme.background,
    
  }));

  const handleToggleCategories = () => {
    if (showCategories) {
      opacity.value = withTiming(0, { duration: 200 });
      height.value = withTiming(0, { duration: 200 });
    } else {
      opacity.value = withTiming(1, { duration: 200 });
      height.value = withTiming(130, { duration: 200 });
    }
    setShowCategories(!showCategories);
  };

  return (
    <Container>
      <ExploreHeader onclick={handleToggleCategories} />

      {/* Category Section - Toggles on Compass Click */}
      <Animated.View style={animatedStyle} className="z-10  overflow-hidden">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-2 py-3"
        >
          {category.map((cat, index) => (
            <ImageBackground
              key={index}
              source={{ uri: cat.url }}
              className="w-40 h-28 rounded-2xl mr-2 justify-center items-center overflow-hidden"
              imageStyle={{ borderRadius: 16, opacity: 0.6 }}
              resizeMode="cover"
            >
              <AppText variant="bold" className="text-white text-xl capitalize">
                {cat.name}
              </AppText>
            </ImageBackground>
          ))}
        </ScrollView>
      </Animated.View>

      {/* List of Anime */}
      <ScrollView
        contentContainerClassName="px-4 pt-4 pb-24"
      style={{
        backgroundColor: lightTheme.background,
      }}
      >
        <LegendList
          data={animeData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          recycleItems={true}
          maintainVisibleContentPosition
        />
      </ScrollView>
    </Container>
  );
}
