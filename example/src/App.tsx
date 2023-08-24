import * as React from 'react';
import { useState } from 'react';

import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import DraggableList, { ScaleDecorator } from 'react-native-x-draggable-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, getBackgroundColor, getCurrentTime, styles } from './utils';
import type { RenderItemParams } from 'src/DraggableList/types';

/**
 * Type of the item in the list
 */
export type Item = {
  id: string;
  content: {
    label: string;
    subtitle: string;
    color: string;
  };
};

/**
 * Prepare example items for the list
 */
const getItems = (count: number): Item[] =>
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
  const [lastEvent, setLastEvent] = useState('Listening for events...');

  const logEvent = (event: string) => {
    setLastEvent(`${event} at ${getCurrentTime()}`);
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    const viewStyle = {
      backgroundColor: isActive ? COLORS.ACTIVE : item.content.color,
    };
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          onPress={() => logEvent(`onPress ${item.id}`)}
        >
          <View style={[styles.rowItem, viewStyle]}>
            <Text style={styles.text}>{item.content.label}</Text>
            <Text style={styles.subtitle}>{item.content.subtitle}</Text>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={[styles.container, styles.backgroundDark]}>
      <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
        <View style={styles.header}>
          <Text style={styles.title}>Draggable demo</Text>
          <Text style={styles.logger}>{lastEvent}</Text>
        </View>
        <DraggableList
          items={items}
          renderItem={renderItem}
          onDragEnd={({ data }) => {
            logEvent('onDragEnd');
            setItems(data);
          }}
          onDragBegin={() => logEvent('onDragBegin')}
          onPlaceholderIndexChange={(index: number) =>
            logEvent(`onPlaceholderIndexChange ${index}`)
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
