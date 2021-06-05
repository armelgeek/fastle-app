import { EditOutlined,MinusCircleOutlined, MinusOutlined, SwapRightOutlined } from '@ant-design/icons';
import { Col,Popconfirm , message } from 'antd';
import { Card, Avatar } from 'antd';
const { Meta } = Card;
import { useHistory } from "react-router-dom";
import React ,{ useState } from 'react';
import EditProject from "./edit";
import './styles.scss'
export default function Project({ project , toggle,updateData,remove }) {
  const [toggleEdit,setToggleEdit] = useState(false);
  const deleteMsg = 'Etes vous sur de vouloir supprimer '+project.id+' ?';
  const history = useHistory();
  const toogleShow = ()  => {
    setToggleEdit(!toggleEdit)
  }
  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }
  
  function cancel(e) {
  }
  const projectBoard = (projectId:number)=>{
     history.push("/project-board/"+projectId);
  }
  return (
    <> 
    {toggleEdit ? 
        <EditProject project={project} onEdit={toogleShow} />
    :<>
        <Col span={6} >
        <Card  style={{ margin: 15 }} 
         cover={
          <img 
            height={150}
            alt={project.title}
            src={project.image ==" " 
              ? "https://ui-avatars.com/api/?length=2&font-size=0.3&&background=0D8ABC&color=fff" : 
              project.image}
          />
        } actions={[
          
          <EditOutlined onClick={toogleShow} />,
          <MinusOutlined type="ellipsis" key="ellipsis"  onClick={(e) =>{
            remove(project._id)
          }}/>,
          <SwapRightOutlined onClick={(e) =>{
            projectBoard(project._id)
          }} />
        ]}>
        <Meta
          title={project.title}
          description={project.description}
        />
        </Card>
        </Col>
      
     </>
  }
    </>
  );
}
