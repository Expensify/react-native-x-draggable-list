import type { RenderItemParams } from 'react-native-draggable-flatlist';

export type DefaultItemProps = {
  id: string;
};

export type DraggableListProps<T extends DefaultItemProps> = {
  items: T[];
  renderItem: (params: RenderItemParams<T>) => React.ReactNode;
  onDragEnd?: (params: { data: T[] }) => void;
  onDragBegin?: () => void;
  onPlaceholderIndexChange?: ((placeholderIndex: number) => void) | undefined;
};
