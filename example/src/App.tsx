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
import { DraggableList, ScaleDecorator } from 'react-native-x-draggable-list';
import type { RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { Item } from 'src/DraggableList/types';
import * as Haptics from 'expo-haptics';

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

const getCurrentTime = () => {
  return new Date().toLocaleTimeString();
};

const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

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
          onDragEnd={({ data }: any) => {
            logEvent('onDragEnd');
            setItems(data);
            if (isNative) {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            }
          }}
          onDragBegin={() => {
            logEvent('onDragBegin');
            if (isNative) {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            }
          }}
          onPlaceholderIndexChange={(index: number) => {
            logEvent(`onPlaceholderIndexChange ${index}`);
            if (isNative) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
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
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: COLORS.DARK,
    color: COLORS.LIGHT,
    paddingBottom: 10,
  },
  logger: {
    fontSize: 16,
    color: COLORS.LIGHT,
    textAlign: 'center',
  },
});
