import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { Flex } from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "../../models";

function TodoList() {
  const tasksByStatus = useStoreState((state:any) => state.tasks.tasksByStatus);
  const moveTask = useStoreActions((actions:any) => actions.tasks.moveTask);
  const createStatus = useStoreActions((actions:any) => actions.tasks.createStatus);
  const editStatus = useStoreActions((actions:any) => actions.tasks.editStatus);
  const editTask = useStoreActions((actions:any) => actions.tasks.editTask);
  const createTask = useStoreActions((actions:any) => actions.tasks.createTask);
  const deleteTask = useStoreActions((actions:any) => actions.tasks.deleteTask);

  return (
    <Flex h="100%" direction="column">
      <Flex flex={1} mt={15} wrap="nowrap" overflowX="scroll">
        <DragDropContext onDragEnd={moveTask}>
          {tasksByStatus.map((status:any) => {
            const column = status;
            return (
              <Column
                key={column.id}
                column={column}
                createStatus={createStatus}
                editStatus={editStatus}
                editTask={editTask}
                createTask={createTask}
                deleteTask={deleteTask}
              />
            );
          })}
          <Column
            key="new-column"
            createStatus={createStatus}
            editStatus={editStatus}
            editTask={editTask}
            createTask={createTask}
            deleteTask={deleteTask}
          />
        </DragDropContext>
      </Flex>
    </Flex>
  );
}

export default TodoList;
