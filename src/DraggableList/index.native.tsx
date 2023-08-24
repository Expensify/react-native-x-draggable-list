import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import type { DefaultItemProps, DraggableListProps } from './types';

export const DraggableList = <T extends DefaultItemProps>({
  items,
  ...props
}: DraggableListProps<T>) => {
  return (
    <DraggableFlatList
      data={items}
      keyExtractor={(item) => item.id}
      {...props}
    />
  );
};
