import React , {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BoardLink from '../../../partials/BoardLink';
import { Row, Col, Button, Card } from 'antd';
import socketIOClient from "socket.io-client"
import { emitEvent, onEvent } from './../../../../socket';
import { useStoreState, useStoreActions } from 'easy-peasy';
import SprintStart from './sprint-start';
import { Droppable } from 'react-beautiful-dnd';
import moment from 'moment';
interface RouteParams {
    id: string
  }
  
function SprintItem({sprint , showModal}){
  const grid = 8;
  const getListStyle = (isDraggingOver:any) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
  });
  return(
    <>
      <Card title={sprint.title}  extra={<Button type="default"   onClick={(e) =>{
        showModal(sprint)
       }} >Démmarer le sprint</Button>}>
        <Droppable droppableId="backlog">
          {(provided:any, snapshot:any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
          {/*   {moment(sprint.startDate)} - {moment(sprint.dueDate)}*/}
           </div> )}
          </Droppable>
      </Card>
    </>
  );
}

export default SprintItem