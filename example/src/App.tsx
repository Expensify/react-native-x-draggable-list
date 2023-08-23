import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { MyButton } from 'react-native-awesome-module';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const getItems = (count: number) =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

export default function App() {
  const [items, setItems] = useState(getItems(5));

  return (
    <GestureHandlerRootView style={[styles.container]}>
      <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
        <MyButton items={items} setData={setItems} />
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
