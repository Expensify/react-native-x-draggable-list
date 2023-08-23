import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

export const MyButton = () => {
  return (
    <DragDropContext>
      <div>Hello world</div>
    </DragDropContext>
  );
};
