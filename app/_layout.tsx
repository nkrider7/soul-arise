import '../global.css';
import 'expo-dev-client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import {  Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeToggle } from '~/components/ThemeToggle';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { Provider } from 'react-redux';
import { persistor, store } from '~/src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import { AuthProvider } from '~/src/context/AuthProvider';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Bold.ttf'),
    Semibold: require('../assets/fonts/SemiBold.ttf'),
    Normal: require('../assets/fonts/Medium.ttf'),
    Light: require('../assets/fonts/Light.ttf'),
  });
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  if (!fontsLoaded) {
    return <Text  className='text-black'>Font Loading</Text>; // Or render a splash screen here
  }
  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
         <AuthProvider>
      <PersistGate loading={null} persistor={persistor}>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack screenOptions={SCREEN_OPTIONS}>
                <Stack.Screen name="(tabs)" options={TABS_OPTIONS} />
                <Stack.Screen name="(pages)/settings" options={{
                  headerShown: false,
                  animation: 'fade_from_bottom', // for android
                }} />
                <Stack.Screen name="(pages)/add-counter" options={{
                  headerShown: false,
                  animation: 'fade_from_bottom', // for android
                }} />
                <Stack.Screen name="(onboard)/AvatarSlection" options={{
                  headerShown: false,
                  animation: 'fade_from_bottom', // for android
                }} />
                <Stack.Screen name="(onboard)/login" options={{
                  headerShown: false,
                  animation: 'fade_from_bottom', // for android
                }} />
                <Stack.Screen name="(onboard)/challenges" options={{
                  headerShown: false,
                  animation: 'fade_from_bottom', // for android
                }} />
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
        </PersistGate>
        </AuthProvider>
        </Provider>
      </GestureHandlerRootView>

      {/* </ExampleProvider> */}
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right', // for android
} as const;

const TABS_OPTIONS = {
  headerShown: false,
} as const;

