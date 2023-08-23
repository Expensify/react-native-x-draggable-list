import React from 'react';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import type { Props } from './types';

export function MyScaleDecorator({ children }: Props) {
  return <ScaleDecorator>{children}</ScaleDecorator>;
}
