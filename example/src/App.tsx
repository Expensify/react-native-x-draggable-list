import * as React from 'react';
import { useState } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MyDraggableList, MyScaleDecorator } from 'react-native-awesome-module';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const getItems = (count: number) =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: `item-${k}`,
    content: { label: `item ${k}`, subtitle: 'test' },
  }));

export default function App() {
  const [items, setItems] = useState(getItems(5));

  const renderItem = ({ item, drag, isActive }: any) => {
    return (
      <MyScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? '#111111' : item.backgroundColor },
          ]}
        >
          <Text style={styles.text}>{item.content.label}</Text>
          <Text>{item.content.subtitle}</Text>
        </TouchableOpacity>
      </MyScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={[styles.container]}>
      <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
        <MyDraggableList
          items={items}
          renderItem={renderItem}
          onDragEnd={({ data }: any) => {
            console.log('onDragEnd', data);
            setItems(data);
          }}
          onDragBegin={() => {
            console.log('onDragBegin');
          }}
        />
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
  rowItem: {
    height: 100,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
