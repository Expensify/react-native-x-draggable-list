import { ScaleDecorator as ScaleDecoratorDraggableFlatlist } from 'react-native-draggable-flatlist';
import type { Props } from '../types';

export default function ScaleDecorator({ children }: Props) {
  return (
    <ScaleDecoratorDraggableFlatlist>
      {children}
    </ScaleDecoratorDraggableFlatlist>
  );
}
