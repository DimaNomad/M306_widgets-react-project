import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import { useRef, useEffect } from "react";
import "../style/WidgetMenu.css";

interface DragAndDropProps {
  widgetArray: any;
  handleOnDragEnd: any;
  widgetRef: any;
}

const DragAndDrop: React.FC<DragAndDropProps> = (props: DragAndDropProps) => {
  const { widgetArray, handleOnDragEnd, widgetRef } = props;

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="widgets">
        {(provided) => (
          <ul
            className="componentsList"
            {...provided.droppableProps}
            data-rbd-droppable-context-id="1"
            ref={provided.innerRef}
          >
            {widgetArray.map(({ component, open, id }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div
                        className="wrapper"
                        ref={widgetRef}
                        style={
                          open
                            ? {
                                height: "630px",
                              }
                            : { height: "0px" }
                        }
                      >
                        {component}
                      </div>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default DragAndDrop;
