import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import type { Props } from './types';

export const MyDraggableList = ({ items, setData, renderItem }: Props) => {
  return (
    <DraggableFlatList
      data={items}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};
