import React from 'react';
import { OpacityDecorator as OpacityDecoratorDraggableFlatlist } from 'react-native-draggable-flatlist';
import type { Props } from '../types';

export function OpacityDecorator({ children }: Props) {
  return (
    <OpacityDecoratorDraggableFlatlist>
      {children}
    </OpacityDecoratorDraggableFlatlist>
  );
}
