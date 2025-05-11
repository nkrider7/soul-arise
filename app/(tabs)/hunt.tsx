import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';
import AppText from '~/components/universal/AppText';
import { Avatars } from '~/lib/Avtar';


export default function Hunt() {
  return (
    <View className="flex-1 bg-black  justify-center items-center pt-12">
      <AppText variant='bold' className="text-white text-2xl text-center mb-4">Coming Soon!!!</AppText>
    </View>
  );
}
