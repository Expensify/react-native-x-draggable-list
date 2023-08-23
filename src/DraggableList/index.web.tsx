import React, { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type OnDragEndResponder,
} from 'react-beautiful-dnd';
import { View } from 'react-native';
import type { DraggableListProps, Item } from './types';

type ReoderParams = {
  list: Item[];
  startIndex: number;
  endIndex: number;
};

// Function to help us with reordering the result
const reorder = ({ list, startIndex, endIndex }: ReoderParams) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  if (removed !== undefined) {
    result.splice(endIndex, 0, removed);
  }

  return result;
};

export const DraggableList = ({
  items,
  renderItem,
  onDragEnd: onDragEndCallback,
  onDragBegin: onDragBegin,
}: DraggableListProps) => {
  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const reorderedItems = reorder({
        list: items,
        startIndex: result.source.index,
        endIndex: result.destination.index,
      });

      onDragEndCallback && onDragEndCallback({ data: reorderedItems });
    },
    [items, onDragEndCallback]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragBegin}>
      <Droppable droppableId="droppable">
        {(droppableProvided) => (
          <View
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided, snapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    {renderItem({
                      item,
                      getIndex: () => 1,
                      isActive: snapshot.isDragging,
                      drag: () => {},
                    })}
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </View>
        )}
      </Droppable>
    </DragDropContext>
  );
};
