import * as React from 'react';

import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { MyButton } from 'react-native-awesome-module';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={[styles.container]}>
      <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
        <MyButton />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
