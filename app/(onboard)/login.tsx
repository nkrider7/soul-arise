import { auth } from '~/src/config/firebase';
import { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '~/components/universal/AppText';
import { lightTheme } from '~/theme/colors';
import AppButton from '~/components/universal/AppButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isLoginMode) {
        await auth().signInWithEmailAndPassword(email, password);
        console.log('Logged in successfully');
        // router.replace('/(tabs)');  <-- NO need here! AuthProvider will do routing
      } else {
        await auth().createUserWithEmailAndPassword(email, password);
        console.log('Account created');
        router.replace('/(onboard)/AvatarSlection'); // Avatar selection after signup
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      Alert.alert('Error', error.message);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setEmail('');
    setPassword('');
  };

  return (
    <View style={{ backgroundColor:lightTheme.background}} className="flex-1  justify-center items-center p-6">
      <AppText variant='bold' className="text-2xl text-white  mb-6">
        {isLoginMode ? 'Login' : 'Sign Up'}
      </AppText>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
    style={{backgroundColor:lightTheme.background2, fontFamily: 'Semibold'}}
        className="border border-purple-950 w-full text-white p-3 mb-4 rounded-md"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
         style={{backgroundColor:lightTheme.background2, fontFamily: 'Semibold'}}
        className="border border-purple-950 w-full p-3 text-white  mb-4 rounded-md"
      />

      <AppButton
        style={{ backgroundColor: lightTheme.mypurple}}
        className='border-purple-950 text-4xl'
        title={isLoginMode ? "Login" : "Sign Up"}
        onPress={handleAuth}
      />

      <TouchableOpacity onPress={toggleMode} className="mt-4 ">
        <AppText variant='semibold' className="text-sky-600">
          {isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
