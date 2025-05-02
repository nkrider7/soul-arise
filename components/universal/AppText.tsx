import { Text, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

export default function AppText({ children, style, ...rest }: { children: ReactNode; style?: object; [key: string]: any }) {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
    // Add default fontFamily or lineHeight if needed
    // fontFamily: 'YourFontName',
  },
});
