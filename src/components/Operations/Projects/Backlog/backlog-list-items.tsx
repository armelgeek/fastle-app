import React ,{useEffect , useState }from 'react';
import { Row, Typography, Col, Button, Modal } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';

import BacklogItem from './backlog-item';
import BacklogAdd from './backlog-add';
import BacklogDetail from './backlog-detail';
import SprintList from './../Sprints/sprint-list';

function BacklogListItems({projectId,storiesList,showModal}){
  const [story,setStory] = useState({})

  return(
    <div className="container project-container">
      {storiesList.map((story:any) => (
          <BacklogItem key={story._id} story={story} showModal={showModal}   />
       ))}
    </div>
  );
}

export default BacklogListItems;