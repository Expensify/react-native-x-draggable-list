import type { RenderItemParams } from 'react-native-draggable-flatlist';

export type Item = {
  id: string;
  content: any;
};

export type Props = {
  items: Item[];
  setData: (data: Item[]) => void;
  renderItem: (params: RenderItemParams<Item>) => React.ReactNode;
};
