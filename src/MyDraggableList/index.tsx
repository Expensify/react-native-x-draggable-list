import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import type { Props } from './types';

export const MyDraggableList = ({ items, renderItem, onDragEnd }: Props) => {
  return (
    <DraggableFlatList
      data={items}
      onDragEnd={onDragEnd}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};
