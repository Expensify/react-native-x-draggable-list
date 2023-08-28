import React from 'react';
import {ShadowDecorator as ShadowDecoratorDraggableFlatlist} from 'react-native-draggable-flatlist';
import type {Props} from '../types';

export default function ShadowDecorator({children}: Props) {
    return <ShadowDecoratorDraggableFlatlist>{children}</ShadowDecoratorDraggableFlatlist>;
}
