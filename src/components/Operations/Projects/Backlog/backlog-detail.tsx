import React, { useState , useRef } from 'react';
import { Row, Col, Modal, Button, Input, Form, FormInstance, Typography, Avatar, InputNumber } from 'antd';
import { FastleForm, 
         FastleInputEdit,
         FastleTextAreaEdit , 
         FastleInputNumberEdit,
         FastleSelectEdit,
         FastleSelectNumberEdit
        } from "../../../hooks/FastleField";
import { useStoreActions } from 'easy-peasy';
import TaskList from './Tasks/task-list';
import { Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import CommentList from './Comments/comment-list';
function toogleDescriptionItem({props}){
  return    <div>{JSON.stringify(props)}</div>
}
const BacklogDetail =({isModalVisible,handleOk,handleCancel,story}) => {
  const formRef= useRef<FormInstance<any> | null>(null)
  const patching = useStoreActions((actions:any) => actions.stories.patching);
  const [userSelectData,setUserSelectData] = useState<any>([
    {
      _id:"dsqdsqdsqdqd",
      username:'armel wanes'
    },{
      _id:'szetyvedd',
      username:'rakoto be'
    }
  ]);
  const [prioriteStory,setPrioriteStory] = useState<any>([
    {
      _id:1,
      title:"one"
    }, {
      _id:2,
      title:"deux"
    },
    {
      _id:3,
      title:"trois"
    },
  ]);
  const [statusData,setStatusData] = useState<any>([
    {
      _id:"dsqdsqdsqdqd",
      title:'A faire'
    },{
      _id:'szetyvedd',
      title:'En cours'
    }
    ,{
      _id:'szetyveddeer',
      title:'En cours de test'
    }
  ]);

  
  const onSaveClick = () =>{
    handleOk()
  }
  const onCancelClick = () => {
    handleCancel()
  }
  return (
    <>
      <Modal  visible={isModalVisible}  onCancel={onCancelClick} footer={null} width={900}>
        <Typography.Text level={2}>Visualiser la fiche produit</Typography.Text>
        <FastleForm ref ={formRef} method={"POST"}>
          <Row gutter={24}>
              <Col span={14}>
                <FastleInputEdit 
                  name ={"title"}
                  title={"Ajouter une titre"}
                  data={story}
                  inputData={story.title}
                  action = {patching}
                  />
                  
                <FastleTextAreaEdit
                  name ={"description"}
                  title={"description du story"}
                  data={story}
                  inputData={story.description}
                  action = {patching} 
                  toggleContent={toogleDescriptionItem}
                  />
                  <h5>Sous-taches</h5>  
                  <TaskList storyId={story._id} />
                  <h5>Activités</h5>
                   <h6>Commentaires</h6>
                   <CommentList storyId={story._id} />
              </Col>
              <Col span={10}>
                  <h3>Etat</h3>
                  <FastleSelectEdit  
                    name ={"statusId"}
                    title={"Status de cette tache"}
                    data={story}
                    selectData = {statusData}
                    selectOptionTitle = {"title"}
                    inputData={story.userId}
                    action = {patching}
                    defaultValue={statusData[0]}
                  />
                  <h3>Responsable</h3>
                  <FastleSelectEdit  
                    name ={"userId"}
                    title={"responsable"}
                    data={story}
                    selectData = {userSelectData}
                    selectOptionTitle = {"username"}
                    inputData={story.userId}
                    action = {patching}
                    defaultValue={"responsable"}
                  />
                  <h4>Rapporteur</h4>
                  <p><Avatar icon={<UserOutlined />} /> Armel wanes </p>
                  <h5>Etiquette</h5> 
                   
                  <h5>Story points</h5>  
                  <FastleInputNumberEdit
                  name ={"point"}
                  title={"Ajouter un story point"}
                  data={story}
                  inputData={story.point}
                  action = {patching}  />
                  
                  <h5>Priorité</h5>
                  <FastleSelectNumberEdit  
                    name ={"priorite"}
                    title={"ajouter une priorite"}
                    data={story}
                    selectData = {prioriteStory}
                    selectOptionTitle = {"title"}
                    inputData={story.priorite}
                    action = {patching}
                    defaultValue={prioriteStory[0]}
                  />
                   <h4>Sprint</h4>
              </Col>
          </Row>
        </FastleForm>   
     
        
      </Modal>
    </>
  );
};
export default BacklogDetail;
