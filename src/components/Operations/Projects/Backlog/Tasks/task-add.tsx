import React ,{ useState , useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStoreActions } from "easy-peasy";
import { Row, Col, Button, Typography, Form, Input, FormInstance } from 'antd';
import { FastleInputAdd } from '../../../../hooks/FastleField';
type StoryData = {
  title: string;
}
const  TaskAdd=({storyId})=>{
  const ref= useRef<FormInstance<any> | null>(null)
  const save = useStoreActions((actions: any) => actions.storyTasks.save);
  const newData = { storyId:storyId,createdAt:new Date() } ;
  return(
    <div >
        <FastleInputAdd
            name ={"title"}
            title={"ceci est le title"}
            action = {save}
            data ={newData}
         />
    </div>
  );
}

export default TaskAdd;