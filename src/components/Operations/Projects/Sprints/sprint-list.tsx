import React , {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BoardLink from '../../../partials/BoardLink';
import { Row, Col, Button } from 'antd';
import socketIOClient from "socket.io-client"
import { emitEvent, onEvent } from './../../../../socket';
import { useStoreState, useStoreActions } from 'easy-peasy';
import SprintStart from './sprint-start';
import SprintItem from './sprint-item';
import SprintAdd from './sprint-add';
interface RouteParams {
    id: string
  }
  
function SprintList({projectId}){
  const sprints = useStoreState((state:any) => state.sprints.sprints);
  const initialize = useStoreActions((actions:any) => actions.sprints.initialize);
  const sprintsList = Object.values(sprints);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sprint,setSprint] = useState({})

  const showModal = (data) => {
    setSprint(data)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    initialize(projectId);
  }, [])
  return(
    <>
     <SprintAdd 
        isModalVisible={isModalVisible} 
        handleOk={handleOk}
        handleCancel={handleCancel}
        sprint={sprint}
      />
      
      {sprintsList.map((sp:any) => (
          <SprintItem key={sp._id} sprint={sp} showModal={showModal} />
       ))}
      <SprintStart projectId={projectId}/>
    </>
  );
}

export default SprintList;