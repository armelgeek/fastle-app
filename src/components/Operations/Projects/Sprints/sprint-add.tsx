import React , {useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import BoardLink from '../../../partials/BoardLink';
import { Row, Col, Button, Card, Modal, Form, Input, DatePicker, FormInstance } from 'antd';
import socketIOClient from "socket.io-client"
import { emitEvent, onEvent } from './../../../../socket';
import { useStoreState, useStoreActions } from 'easy-peasy';
import SprintStart from './sprint-start';
import moment from 'moment';

interface RouteParams {
    id: string
  }
const SprintAdd =({isModalVisible,handleOk,handleCancel,sprint}) => {
    const ref= useRef<FormInstance<any> | null>(null)
    const update = useStoreActions((actions:any) => actions.sprints.update);
    const onSaveClick = () =>{
        handleOk()
      }
      const onCancelClick = () => {
        handleCancel()
        ref.current?.resetFields()
      }
    const onFinish = async (data) =>{
     const titleValue = data.title;
     const startDate = data.rangeDate[0];
     const dueDate = data.rangeDate[1];
     const all={
        title:titleValue,
        startDate:startDate,
        dueDate:dueDate
    }
    const newData = { ...all, ...{  _id: sprint._id } };
    await update(newData)
    } 
    const onFinishFailed = () =>{
  
    }
  return(
    <>
     <Modal  visible={isModalVisible}  onCancel={onCancelClick} footer={null} width={500}>
        <h3>Demmarer le sprint</h3>
        <Form ref={ref} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item name="title"  initialValue={sprint.title} >
                <Input placeholder="Nom du sprint" />
            </Form.Item>
            <Form.Item name="rangeDate">
                <DatePicker.RangePicker   defaultValue={moment()} style={{ width: '100%' }}  />
                
            </Form.Item>
            <Form.Item  name="objectif"  initialValue={sprint.objectif} >
                <Input.TextArea   autoSize={{ minRows:4}} placeholder={"objectif du sprint"} />
            </Form.Item>
            <Form.Item>
                <Button type="default"  htmlType="submit" style={{ marginRight: '10px' }} >Démmarer</Button>
                <Button type="primary" onClick={(e) => onCancelClick()} >Annuler</Button>
            </Form.Item>
        </Form>
        
     </Modal>
    
    </>
  );
}

export default SprintAdd