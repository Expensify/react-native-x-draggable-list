import * as React from 'react';
import { useState } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { MyDraggableList, MyScaleDecorator } from 'react-native-awesome-module';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const COLORS = {
  LIST: ['#FAF1E4', '#CEDEBD', '#9EB384'],
  DARK: '#435334',
  SUBTITLE: '#49573c',
  ACTIVE: '#d6dbd0',
  LIGHT: '#FAF1E4',
};

const getBackgroundColor = (index: number) => {
  return COLORS.LIST[index % COLORS.LIST.length];
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
    const backgroundColor = isActive ? COLORS.ACTIVE : item.content.color;
    return (
      <MyScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <View
            style={[
              styles.rowItem,
              {
                backgroundColor,
              },
            ]}
          >
            <Text style={styles.text}>{item.content.label}</Text>
            <Text style={styles.subtitle}>{item.content.subtitle}</Text>
          </View>
        </TouchableOpacity>
      </MyScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={[styles.container, styles.backgroundDark]}>
      <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
        <Text style={styles.header}>Draggable demo</Text>
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
  backgroundDark: {
    backgroundColor: COLORS.DARK,
  },
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  rowItem: {
    height: 100,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: COLORS.DARK,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.SUBTITLE,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: COLORS.DARK,
    color: COLORS.LIGHT,
  },
});
