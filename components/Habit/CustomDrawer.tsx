import { View, Text, Image, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '~/src/store/hook/hook';
import { auth } from '~/src/config/firebase';
import {
  LogOut,
  User,
  Settings,
  ShoppingBag,
  Flame,
  Medal,
  Hand,
  FlameIcon,
} from 'lucide-react-native';
import AppText from '~/components/universal/AppText';
import { lightTheme } from '~/theme/colors';
import { statIcons } from '~/src/constant/Icons';
import HunterCard from './HunterCard';

import { useEffect, useState } from 'react';

export default function CustomDrawer(props: any) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) => state.player);
  const { stats, xp, level, rank } = useAppSelector(state => state.player);
  const statEntries = Object.entries(stats);
  const handleLogout = async () => {
    try {
      await auth().signOut();
      router.replace('/(onboard)/login');
    } catch (e: any) {
      console.error(e.message);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: lightTheme.background }}>
      <View className="flex-1  ">
        {/* Profile Section */}
        <View >

          <HunterCard description={player.character?.description || ""} image={player.character?.image} name={player.character?.name || ""} power={player.character?.powers?.join(", ") || ""} rank={player.character?.rankLevel || ""} />

        </View>

        <View className="flex-row flex-wrap gap-y-1 justify-between mt-4">
          {statEntries.map(([stat, value]) => (
            <View
              key={stat}
              style={{ backgroundColor: lightTheme.background2 }}
              className="w-[48%] flex flex-row items-center justify-between  px-4 py-4 mb-2 rounded-lg"
            >
              <View>
                <AppText variant='bold' className=" text-white text-3xl">{value}</AppText>
                <AppText variant='bold' className="capitalize font-medium text-white">{stat}</AppText>
              </View>
              <View className="flex-row items-center gap-x-2">
                {statIcons.hasOwnProperty(stat) ? statIcons[stat] : <Text style={{ color: 'white' }}>?</Text>}

              </View>
              {/* <AppText svariant='bold' className=" text-white text-3xl">{value}</AppText>r */}
            </View>
          ))}
        </View>
        {/* Divider */}
        <View className="h-px bg-zinc-700 mb-4" />

        {/* Navigation Links */}
        <View className="space-y-4">

          <DrawerLink
            icon={<Flame color="orange" size={20} fill={'orange'} />}
            label="Home"
            onPress={() => router.replace('/(drawer)/(tabs)')
            }
          />
          <DrawerLink
            icon={<Hand color="cyan" size={20} />}
            label="Counter"
            onPress={() => router.replace('/(drawer)/counter')
            }
          />
          <DrawerLink
            icon={<Medal color="gold" size={20} />}
            label="Challenges"
            onPress={() => router.push('/(onboard)/challenges')}
          />
          <DrawerLink
            icon={<ShoppingBag color="violet" size={20} />}
            label="Shop"
            onPress={() => router.push('/(pages)/Shop')}
          />
          <DrawerLink
            icon={<Settings color="gray" size={20} />}
            label="Settings"
            onPress={() => router.push('/(pages)/settings')}
          />
        </View>

        {/* Bottom Actions */}
        <View className="mt-auto border-t border-zinc-700 pt-6">

          <Text className="text-zinc-500 text-xs text-center mt-4">
            v1.0.0 • Build 42
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerLink({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 px-1 py-2">
      {icon}
      <AppText variant='bold' className="text-white text-base">{label}</AppText>
    </Pressable>
  );
}
