import React , {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BoardLink from '../../../partials/BoardLink';
import { Row, Col, Button } from 'antd';
import Backlogs from './Backlogs';
import socketIOClient from "socket.io-client"
import { emitEvent, onEvent } from './../../../../socket';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Dnd from './../dnd';
interface RouteParams {
    id: string
  }
  
function Backlog(){
  let { id } = useParams<RouteParams>();
  return(
    <div className="container project-container">
          <BoardLink  projectId ={id}/>
        <Row gutter={24}>
            <Col span={24}>
               <Backlogs projectId ={id} />
              
            </Col>
          
         
        </Row>
        
    </div>
  );
}

export default Backlog;