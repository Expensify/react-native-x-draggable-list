import type { RenderItemParams } from 'react-native-draggable-flatlist';

export type Item = {
  id: string;
  content: any;
};

export type DraggableListProps = {
  items: Item[];
  renderItem: (params: RenderItemParams<Item>) => React.ReactNode;
  onDragEnd?: (params: { data: Item[] }) => void;
  onDragBegin?: () => void;
};
