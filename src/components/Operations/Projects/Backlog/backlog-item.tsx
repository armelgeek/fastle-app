import React from 'react';
import './styles.scss';
import { Typography, Tag } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import { useStoreActions } from 'easy-peasy';
import { Button } from 'antd';
function BacklogItem(props) {
  const grid=8;
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });
  const remove = useStoreActions((actions: any) => actions.stories.remove);
  return (
    <Draggable key={props.story._id} draggableId={props.story._id} index={props.index}>
      {(provided: any, snapshot: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Typography.Text>
            <BookOutlined
              style={{ fontSize: '16px', color: '#08c', marginRight: '5px' }} />
            {props.story.title}
            <Tag>{props.story.point > 0 ? props.story.point : "..."}</Tag>
            {props.story?.statusId.length > 0 ? <Tag>{props.story.statusId}</Tag> : ""}
          </Typography.Text>
          <Button type="default" onClick={(e) => {
            props.showModal(props.story)
          }}>Editer</Button>
          <Button type="default" onClick={(e) => {
            remove(props.story._id)
          }}>Supprimer</Button>
        </div>
      )}
    </Draggable>
  );
}

export default BacklogItem;