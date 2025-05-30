import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  Bell,
  Settings,
  Lock,
  FlaskConical,
  Accessibility,
  Sparkles,
  HeartHandshake,
  HelpCircle,
  MessageCircleMore,
  Info,
  PhoneCall,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native'; // if needed for navigation
import SettingsItem from '~/components/SettingsItem';
import AppButton from '~/components/universal/AppButton';
import { auth } from '~/src/config/firebase';
import { router } from 'expo-router';
import { useAppDispatch } from '~/src/store/hook/hook';
import { resetQuests } from '~/src/store/slices/questSlice';
import { persistor } from '../../src/store';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
    const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(resetQuests());
      persistor.purge();
      console.log('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error.message);
    }
    };
  

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-8 py-4">
        <TouchableOpacity className='flex-row items-center gap-x-2' onPress={() => navigation.goBack()}>
          <ChevronLeft  size={20} color={'white'}  />
          <Text className="text-white text-2xl font-bold">Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Settings List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="border-t pt-3 border-gray-700">
          <SettingsItem
            title="Notifications"
            icon={Bell}
            onPress={() => console.log('Notifications')}
          />
          <SettingsItem
            title="Check-in options"
            icon={Settings}
            onPress={() => console.log('Check-in')}
          />
          <SettingsItem
            title="Security & Data"
            icon={Lock}
            onPress={() => console.log('Security')}
          />
          <SettingsItem
            title="The HWF Research Project"
            icon={FlaskConical}
            onPress={() => console.log('Research')}
          />
          <SettingsItem
            title="Accessibility"
            icon={Accessibility}
            onPress={() => console.log('Accessibility')}
          />
          <SettingsItem
            title="AI settings"
            icon={Sparkles}
            onPress={() => console.log('AI settings')}
          />
        </View>

        {/* Resources Section */}
        <View className="mt-6 px-4">
          <Text className="text-white text-lg font-bold mb-2">Resources</Text>
        </View>

        <View className="border-t border-gray-700">
          <SettingsItem
            title="Donate"
            icon={HeartHandshake}
            onPress={() => console.log('Donate')}
          />
          <SettingsItem
            title="Mental health hotlines"
            icon={PhoneCall}
            onPress={() => console.log('Hotlines')}
          />
          <SettingsItem
            title="Frequently asked questions"
            icon={HelpCircle}
            onPress={() => console.log('FAQ')}
          />
          <SettingsItem
            title="Send feedback"
            icon={MessageCircleMore}
            onPress={() => console.log('Feedback')}
          />
          <SettingsItem
            title="About"
            icon={Info}
            onPress={() => router.push('/(pages)/about')}
          />
        </View>

     <View className='px-10 mt-8'> 
         <AppButton onPress={handleLogout} variant='danger' size='sm' title='Logout' />
     </View>
      </ScrollView>
    </View>
  );
}
