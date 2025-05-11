import { Link, Tabs } from 'expo-router';
import { BookMarked, CircleUserRound, Flame, Swords } from 'lucide-react-native';
import { lightTheme } from '~/theme/colors';
import { View, Animated } from 'react-native';
import { useRef, useEffect } from 'react';

// Reusable animated wrapper
import { ReactNode } from 'react';

function AnimatedIcon({ children, focused }: { children: ReactNode; focused: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {children}
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        animation: 'shift',
        tabBarStyle: {
          backgroundColor: lightTheme.background,
          paddingTop: 3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              {focused ? (
                <View style={{ width: 24, height: 24, position: 'relative' }}>
                  <Flame color="red" style={{ position: 'absolute', left: -1, top: -1 }} />
                  <Flame color="white" style={{ position: 'absolute', left: 1, top: 1 }} />
                  <Flame color={color} style={{ position: 'absolute', left: 0, top: 0 }} />
                </View>
              ) : (
                <Flame color={color} />
              )}
            </AnimatedIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="quest"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              {focused ? (
                <View style={{ width: 24, height: 24, position: 'relative' }}>
                  <BookMarked
                    color={lightTheme.secondary}
                    style={{ position: 'absolute', left: 1.5, top: 1.5 }}
                  />
                  <BookMarked color={color} style={{ position: 'absolute', left: 0, top: 0 }} />
                </View>
              ) : (
                <BookMarked color={color} />
              )}
            </AnimatedIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="hunt"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              {focused ? (
                <View style={{ width: 24, height: 24, position: 'relative' }}>
                  <Swords
                    color={lightTheme.secondary}
                    style={{ position: 'absolute', left: 1.5, top: 1.5 }}
                  />
                  <Swords color={color} style={{ position: 'absolute', left: 0, top: 0 }} />
                </View>
              ) : (
                <Swords color={color} />
              )}
            </AnimatedIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              {focused ? (
                <View style={{ width: 24, height: 24, position: 'relative' }}>
                  <CircleUserRound
                    color={lightTheme.secondary}
                    style={{ position: 'absolute', left: 1.5, top: 1.5 }}
                  />
                  <CircleUserRound color={color} style={{ position: 'absolute', left: 0, top: 0 }} />
                </View>
              ) : (
                <CircleUserRound color={color} />
              )}
            </AnimatedIcon>
          ),
        }}
      />
    </Tabs>
  );
}
