import React , {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BoardLink from '../../../partials/BoardLink';
import { Row, Col, Button } from 'antd';
import BacklogList from './backlog-list';
import socketIOClient from "socket.io-client"
import { emitEvent, onEvent } from './../../../../socket';
import { useStoreState, useStoreActions } from 'easy-peasy';
interface RouteParams {
    id: string
  }
  
function SprintStart({projectId}){
  const activeSprint = useStoreState((state:any) => state.sprints.activeSprint);
  const count = useStoreActions((actions:any) => actions.sprints.count);
  const save = useStoreActions((actions:any) => actions.sprints.save);
  const starting = async () => {
      console.log('onckc')
      const newData ={
        projectId :projectId,
        title:"",
        active:true,
        createdAt: new Date()
      }
      await save(newData)
    }
  useEffect(() => {
    count(projectId);
  }, [])
  return(
    <div className="container project-container">
      {activeSprint>0 ?
        <Button type="default" disabled  >Créer un sprint</Button>
      :
        <Button type="default" title="sprint en cours,attendez la fin du sprint pour commencer une nouvelle"  onClick={(e) => starting()} >Créer un sprint</Button>
      }
    </div>
  );
}

export default SprintStart;