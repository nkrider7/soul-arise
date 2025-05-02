import { StyleSheet, SafeAreaView } from 'react-native';
import { lightTheme } from '~/theme/colors';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: lightTheme.background
  },
});
