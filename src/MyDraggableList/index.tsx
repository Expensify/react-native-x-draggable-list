import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import type { Props } from './types';

export const MyDraggableList = ({ items, ...props }: Props) => {
  return (
    <DraggableFlatList
      data={items}
      keyExtractor={(item) => item.id}
      {...props}
    />
  );
};
