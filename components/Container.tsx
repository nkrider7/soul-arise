import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import AppText from './universal/AppText';
import { lightTheme } from '~/theme/colors';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const wrapTextChildren = (child: React.ReactNode): React.ReactNode => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <AppText>{child}</AppText>;
    }
    if (Array.isArray(child)) {
      return child.map((c, i) => <React.Fragment key={i}>{wrapTextChildren(c)}</React.Fragment>);
    }
    return child;
  };

  return (
    <SafeAreaView style={styles.container}>
      {wrapTextChildren(children)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: lightTheme.background,
  },
});
