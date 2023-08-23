import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  type RenderItemParams,
} from 'react-native-draggable-flatlist';

export type Item = {
  id: string;
  content: string;
};

export type Props = {
  items: Item[];
  setData: (data: Item[]) => void;
};

export const MyButton = ({ items, setData }: Props) => {
  console.log('items', items);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? 'red' : item.backgroundColor },
          ]}
        >
          <Text style={styles.text}>{item.content}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={items}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
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
