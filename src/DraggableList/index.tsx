import React, { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type OnDragEndResponder,
  type OnDragUpdateResponder,
} from 'react-beautiful-dnd';
import _ from 'lodash';
import { ScrollView } from 'react-native';
import useDraggableInPortal from '../utils/useDraggableInPortal';
import type { DraggableListProps, DefaultItemProps } from './types';

type ReoderParams<T> = {
  list: T[];
  startIndex: number;
  endIndex: number;
};

// Function to help us with reordering the result
const reorder = <T,>({ list, startIndex, endIndex }: ReoderParams<T>): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  if (removed !== undefined) {
    result.splice(endIndex, 0, removed);
  }

  return result;
};

export default function DraggableList<T extends DefaultItemProps>({
  data = [],
  renderItem,
  keyExtractor,
  onDragEnd: onDragEndCallback,
  onDragBegin,
  onPlaceholderIndexChange,
  renderClone,
  shouldUsePortal = false,
}: DraggableListProps<T>) {
  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const reorderedItems = reorder({
        list: data,
        startIndex: result.source.index,
        endIndex: result.destination.index,
      });

      onDragEndCallback?.({ data: reorderedItems });
    },
    [data, onDragEndCallback]
  );

  const onDragUpdate: OnDragUpdateResponder = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      onPlaceholderIndexChange?.(result.destination.index);
    },
    [onPlaceholderIndexChange]
  );

  const renderDraggable = useDraggableInPortal({ shouldUsePortal });

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragBegin}
      onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="droppable" renderClone={renderClone}>
        {(droppableProvided) => (
          // We use ScrollView to match the native behavior of FlatList
          <ScrollView>
            {/* We can't use the react-native View here, because it doesn't support all props */}
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {_.map(data, (item, index) => {
                const key = keyExtractor(item, index);
                return (
                  <Draggable key={key} draggableId={key} index={index}>
                    {renderDraggable((draggableProvided, snapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        {renderItem({
                          item,
                          getIndex: () => index,
                          isActive: snapshot.isDragging,
                          drag: () => {},
                        })}
                      </div>
                    ))}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </div>
          </ScrollView>
        )}
      </Droppable>
    </DragDropContext>
  );
}
