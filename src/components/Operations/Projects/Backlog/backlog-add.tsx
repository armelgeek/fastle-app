import React ,{ useState , useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BoardLink from '../../../partials/BoardLink';
import { useStoreActions } from "easy-peasy";
import { Row, Col, Button, Typography, Form, Input, FormInstance } from 'antd';
type StoryData = {
  title: string;
}
const  BacklogAdd=({projectId})=>{
  const ref= useRef<FormInstance<any> | null>(null)
  const [title,setTitle] = useState("")
  const save = useStoreActions((actions: any) => actions.stories.save);
  const [data, setData] = useState<StoryData>({
    title: ''
  })
  const handleKeyUp = async (event:any) => {
    // Enter
    event.stopPropagation();
    if (event.keyCode === 13) {
      ref.current?.submit();
      const data ={
        title :title
      }
      const newData = {
         ...data, 
         ...{ projectId:projectId,
              description:"",
              userId:"",
              priorite:2,
              point:0,
              statusId:"",
              createdAt:new Date()
             } };
      await save(newData)
      setData({
        title: '',
      });
      setTitle("")
      ref.current?.resetFields()
    }
  }
 
  return(
    <div >
        <Form ref={ref} onKeyUp={handleKeyUp} tabIndex={0}
            name="normal_add_backlog"
            className="add-backlog"
          >
            <Form.Item name="title" initialValue={title}>
              <Input placeholder="Que ce qui doit être fait ?" autoFocus onChange={(e) =>{
                setTitle(e.target.value)
              }} />
            </Form.Item>
            
          </Form>
    </div>
  );
}

export default BacklogAdd;