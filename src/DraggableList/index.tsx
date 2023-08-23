import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import type { DraggableListProps } from './types';

export const DraggableList = ({ items, ...props }: DraggableListProps) => {
  return (
    <DraggableFlatList
      data={items}
      keyExtractor={(item) => item.id}
      {...props}
    />
  );
};
