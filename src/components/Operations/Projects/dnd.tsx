import React ,{useState} from 'react';
import {DragDropContext , DropResult,Droppable ,Draggable  } from 'react-beautiful-dnd'

interface ItemProps {
  text: string
  index: number
}
interface ColumnProps {
  col: {
    id: string
    list: string[]
  }
}
const Item: React.FC<ItemProps> = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </div>
      )}
    </Draggable>
  )
}
interface ColumnProps {
  list: string[]
}
const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  return (
    <Droppable droppableId={id}>
      {provided => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          >
          <h2>{id}</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '120px'
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((text, index) => (
              <Item key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )}

function Dnd () {
 
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      list: ['item 1', 'item 2', 'item 3']
    },
    doing: {
      id: 'doing',
      list: []
    },
    done: {
      id: 'done',
      list: []
    }
  })
  const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3'])
  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null


    // Set start and end variables
    const start = columns[source.droppableId]
    const end = columns[destination.droppableId]

   
    // If start is the same as end, we're in the same column
    if (start === end) {
      /* ... */
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      )

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      }

      // Make a new end list array
      const newEndList = end.list

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index])

      // Create a new end column
     
      const newEndCol = {
        id: end.id,
        list: newEndList
      }
      console.log(newEndCol)

      // Update the state
      setColumns(state => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }))
      return null
    }

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          margin: '24px auto',
          width: '80%',
          gap: '8px'
        }}
      >
        {Object.values(columns).map(col => (
    <Column col={col} key={col.id} />
  ))}
      </div>
    </DragDropContext>
  )
}
export default Dnd