import React ,{useEffect , useState }from 'react';
import { Row, Typography, Col, Button, Modal } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import BacklogItem from './backlog-item';
import BacklogAdd from './backlog-add';
import BacklogDetail from './backlog-detail';
import SprintList from './../Sprints/sprint-list';
import BacklogListItems from './backlog-list-items';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function BacklogList({projectId}){
  const stories = useStoreState((state:any) => state.stories.stories);
  const initialize = useStoreActions((actions:any) => actions.stories.initialize);
  let storiesList = Object.values(stories);
  const [storyData,setStoryData] = useState(storiesList)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [story,setStory] = useState({})

  const showModal = (data) => {
    setStory(data)
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
       <BacklogDetail 
            isModalVisible={isModalVisible} 
            handleOk={handleOk}
            handleCancel={handleCancel}
            story={story}
      />
      <BacklogAdd projectId ={projectId}/>
      <SprintList projectId ={projectId}/>
      
          {(provided:any, snapshot:any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              
              {storiesList.map((story:any, index:any) => (
                <BacklogItem key={story._id} story={story} index = {index} showModal={showModal}   />
                
              ))}
              {provided.placeholder}
            </div>
          )}
      </>
  );
}

export default BacklogList;

/*
<div className="container project-container">
      
      <SprintList projectId ={projectId}/>
      <BacklogDetail 
            isModalVisible={isModalVisible} 
            handleOk={handleOk}
            handleCancel={handleCancel}
            story={story}
      />
      <Typography.Title level={4}>Backlog ({stories.length}) tickets</Typography.Title>
      <BacklogAdd projectId ={projectId}/>
 
      <BacklogListItems projectId ={projectId} storiesList={storiesList} showModal={showModal}/>
   
    </div>

*/