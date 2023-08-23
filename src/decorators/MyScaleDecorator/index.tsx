import React from 'react';
import { ScaleDecorator } from 'react-native-draggable-flatlist';

export function MyScaleDecorator({ children }) {
  return <ScaleDecorator>{children}</ScaleDecorator>;
}
