import { Link, Redirect, Tabs } from 'expo-router';
import { BookMarked, CircleUserRound, Compass, Dumbbell, Fan, Flame, FlameKindling, Swords } from 'lucide-react-native';
import { lightTheme } from '~/theme/colors';
import { View, Animated, Text } from 'react-native';
import { useRef, useEffect } from 'react';

// Reusable animated wrapper
import { ReactNode } from 'react';
import { useAppSelector } from '~/src/store/hook/hook';
import { RootState } from '~/src/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RotatingIcon } from '~/components/animated/rot';

function AnimatedIcon({
  children,
  focused,
  rotate = false,
}: {
  children: ReactNode;
  focused: boolean;
  rotate?: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.8,
      useNativeDriver: true,
      friction: 4,
    }).start();

    if (focused && rotate) {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        transform: rotate ? [{ rotate: spin }, { scale }] : [{ scale }],
      }}
    >
      {children}
    </Animated.View>
  );
}


function RootLayout() {
  const auth = useAppSelector((state: RootState) => state.auth);
  if(auth.isAuthenticated)

  if(!auth.isAuthenticated){
  return(
    <View>
      <Text>Wait</Text>
    </View>
  )
  }


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
                  <Flame color={lightTheme.mypurple} style={{ position: 'absolute', left: -1, top: -1 }} />
                  <Flame color="white" fill={'white'} style={{ position: 'absolute', left: 1, top: 1 }} />
                  <Flame color={color} style={{ position: 'absolute', left: 0, top: 0 }} />
                </View>
              ) : (
                <FlameKindling color={color} />
              )}
            </AnimatedIcon>
          ),
        }}
      />
      <Tabs.Screen
  name="explore"
  options={{
    title: '',
    headerShown: false,
    tabBarIcon: ({ color, focused }) => (
      <AnimatedIcon focused={focused} rotate={focused}>
        {focused ? (
          <View style={{ width: 24, height: 24, position: 'relative' }}>
            <Compass
              size={24}
              color={lightTheme.mypurple}
              style={{
                position: 'absolute',
                left: 1.5,
                top: 1.5,
                transform: [{ rotate: '-45deg' }],
              }}
            />
            <Compass
              size={24}
              color={color}
              
              style={{ position: 'absolute', left: 0, top: 0 }}
            />
          </View>
        ) : (
        <RotatingIcon />
        )}
      </AnimatedIcon>
    ),
  }}
/>

      <Tabs.Screen
        name="soulsync"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              {focused ? (
                <View style={{ width: 24, height: 24, position: 'relative' }}>
                  <Swords
                    color={lightTheme.mypurple}
                    style={{ position: 'absolute', left: 1.5, top: 1.5 }}
                  />
                  <Swords color={color} fill={color} style={{ position: 'absolute', left: 0, top: 0 }} />
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
                   color={lightTheme.mypurple}
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

export default RootLayout;