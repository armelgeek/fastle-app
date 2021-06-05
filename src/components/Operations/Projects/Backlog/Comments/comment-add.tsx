import React ,{ useState , useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStoreActions } from "easy-peasy";
import { Comment, Avatar } from 'antd';
import { Row, Col, Button, Typography, Form, Input, FormInstance } from 'antd';
import { FastleInputAdd } from '../../../../hooks/FastleField';
type StoryData = {
  title: string;
}
const  CommentAdd=({storyId})=>{
  const ref= useRef<FormInstance<any> | null>(null)
  const save = useStoreActions((actions: any) => actions.commentStories.save);
  const newData = { storyId:storyId,createdAt:new Date() } ;
  return(
    <div >
        <FastleInputAdd
            name ={"content"}
            title={"ajouter un commentaire"}
            action = {save}
            data ={newData}
         />
    </div>
  );
}

export default CommentAdd;