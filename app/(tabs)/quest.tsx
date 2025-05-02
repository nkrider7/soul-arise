import { Stack } from 'expo-router';
import { SafeAreaViewComponent, StyleSheet, View } from 'react-native';
import { Container } from '~/components/Container';
import QuestMainScreen from '~/components/Quest/QuestMainScreen';



export default function Home() {
  return (
    <> 
    <Container>
      <QuestMainScreen />
    </Container>
     
    </>
  );
}
