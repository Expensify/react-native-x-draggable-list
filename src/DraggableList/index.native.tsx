import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import type { DefaultItemProps, DraggableListProps } from './types';

export default function DraggableList<T extends DefaultItemProps>({
  ...props
}: DraggableListProps<T>) {
  return <DraggableFlatList {...props} />;
}
