import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import { useRef, useEffect } from "react";
import "../style/WidgetMenu.css";

interface DragAndDropProps {
  widgetArray: any;
  handleOnDragEnd: any;
  handleCloseButton: any;
}

const DragAndDrop: React.FC<DragAndDropProps> = (props: DragAndDropProps) => {
  const { widgetArray, handleOnDragEnd, handleCloseButton } = props;

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
                        style={
                          open
                            ? {
                                height: "545px",
                              }
                            : { height: "0px" }
                        }
                      >
                        <div
                          className="closeButton"
                          onClick={(event) =>
                            handleCloseButton(
                              event,
                              widgetArray[index].id,
                              widgetArray[index].open
                            )
                          }
                        >
                          x
                        </div>
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
