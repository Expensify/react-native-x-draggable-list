import React from 'react';
import { ShadowDecorator } from 'react-native-draggable-flatlist';
import type { Props } from '../types';

function CustomShadowDecorator({ children }: Props) {
  return <ShadowDecorator>{children}</ShadowDecorator>;
}

export { CustomShadowDecorator as ShadowDecorator };
