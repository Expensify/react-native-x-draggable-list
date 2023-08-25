import type { DraggableChildrenFn } from 'react-beautiful-dnd';
import type { RenderItemParams as OriginalRenderItemParams } from 'react-native-draggable-flatlist';

export type DefaultItemProps = {
  id: string;
};

export type DraggableListProps<T extends DefaultItemProps> = {
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (params: RenderItemParams<T>) => React.ReactNode;
  onDragEnd?: (params: { data: T[] }) => void;
  onDragBegin?: () => void;
  onPlaceholderIndexChange?: ((placeholderIndex: number) => void) | undefined;
  renderClone?: DraggableChildrenFn | undefined
};

export type RenderItemParams<T> = OriginalRenderItemParams<T>;
