import type {DraggableChildrenFn, DraggingStyle} from 'react-beautiful-dnd';
import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

export type DraggableInPortalProps = {
    shouldUsePortal?: boolean;
};

export default function useDraggableInPortal({shouldUsePortal}: DraggableInPortalProps): (render: DraggableChildrenFn) => DraggableChildrenFn {
    if (!shouldUsePortal) {
        return (render) => render;
    }
    const element = useRef<HTMLDivElement>(document.createElement('div')).current;

    useEffect(() => {
        if (!element) {
            return () => {};
        }
        element.style.pointerEvents = 'none';
        element.style.position = 'absolute';
        element.style.height = '100%';
        element.style.width = '100%';
        element.style.top = '0';

        document.body.appendChild(element);

        return () => {
            document.body.removeChild(element);
        };
    }, [element]);

    return (render) => (provided, snapshot, rubric) => {
        const result = render(provided, snapshot, rubric);
        const style = provided.draggableProps.style as DraggingStyle;
        if (style.position === 'fixed') {
            return createPortal(result, element);
        }
        return result;
    };
}
