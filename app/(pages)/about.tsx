import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { lightTheme } from '~/theme/colors';

const socialLinks = [
  {
    icon: require('../../assets/icons/facebook.png'),
    url: 'https://facebook.com/yourpage',
  },
  {
    icon: require('../../assets/icons/instagram.png'),
    url: 'https://instagram.com/yourprofile',
  },
  {
    icon: require('../../assets/icons/x.png'),
    url: 'https://twitter.com/yourhandle',
  },
  {
    icon: require('../../assets/icons/youtube.png'),
    url: 'https://linkedin.com/in/yourprofile',
  },
];

const AboutUs = () => {
  return (
    <View style={{backgroundColor:lightTheme.background}} className="flex-1 px-6 pt-12 pb-6">
      <Text className="text-3xl font-bold text-white text-center mb-4">About Us</Text>

      <Text className="text-base text-gray-200 text-center mb-6">
        Welcome to OurApp! We build meaningful connections through innovative tech. Our goal is to empower and inspire communities globally.
      </Text>

      <Text className="text-lg font-semibold text-white text-center mb-3">Follow Us</Text>

      <View className="flex-row justify-center space-x-5">
        {socialLinks.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(item.url)}
            className="p-2"
            activeOpacity={0.7}
          >
            <Image
              source={item.icon}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AboutUs;
