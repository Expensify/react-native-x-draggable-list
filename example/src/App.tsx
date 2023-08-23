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

const COLORS = ['#FAF1E4', '#CEDEBD', '#9EB384'];

const getBackgroundColor = (index: number) => {
  return COLORS[index % COLORS.length];
};

const getItems = (count: number) =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: `item-${k}`,
    content: {
      label: `Item #${k}`,
      subtitle: `Subtitle ${k}`,
      color: getBackgroundColor(k),
    },
  }));

export default function App() {
  const [items, setItems] = useState(getItems(15));

  const renderItem = ({ item, drag, isActive }: any) => {
    return (
      <MyScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            {
              backgroundColor: isActive ? '#435334' : item.content.color,
            },
          ]}
        >
          <Text style={styles.text}>{item.content.label}</Text>
          <Text style={styles.subtitle}>{item.content.subtitle}</Text>
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
    color: '#435334',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#49573c',
  },
});
