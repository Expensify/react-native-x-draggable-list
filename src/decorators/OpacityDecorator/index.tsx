import React from 'react';
import { OpacityDecorator } from 'react-native-draggable-flatlist';
import type { Props } from '../types';

function CustomOpacityDecorator({ children }: Props) {
  return <OpacityDecorator>{children}</OpacityDecorator>;
}

export { CustomOpacityDecorator as OpacityDecorator };
