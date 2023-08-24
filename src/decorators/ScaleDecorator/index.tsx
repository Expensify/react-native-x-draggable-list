import React from 'react';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import type { Props } from '../types';

function CustomScaleDecorator({ children }: Props) {
  return <ScaleDecorator>{children}</ScaleDecorator>;
}

export { CustomScaleDecorator as ScaleDecorator };
