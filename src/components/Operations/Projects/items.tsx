import React , { useState , useEffect} from "react";
import { useStoreState, useStoreActions } from "../../../models";
import Project from "./item";
import Addroject from "./add";
import { Button, Row,Col, Empty } from 'antd';
import './styles.scss'
import { PlusCircleOutlined } from "@ant-design/icons";

function ProjectList() {
  const projects = useStoreState((state:any) => state.projects.projects);
  const initialize = useStoreActions((actions:any) => actions.projects.initialize);
  const toggle = useStoreActions((actions:any) => actions.projects.toggle);
  const update = useStoreActions((actions:any) => actions.projects.update);
  const remove = useStoreActions((actions:any) => actions.projects.remove);
  const projectsList = Object.values(projects);
  const [projectUpdate,setProjectUpdate] = useState({})
  const [toggleAdd,setToggleAdd] = useState(true);
  useEffect(() => {
    initialize();
  }, [])
   const updateData = (data:any) => {
    setProjectUpdate(data)
  }
  const toogleShow = ()  => {
    setToggleAdd(!toggleAdd)
  }

  return (
    <>
   
      {toggleAdd ?
      <>
        { projectsList.length > 0 && 
         <PlusCircleOutlined style={{ fontSize: '20px',cursor:"pointer" }} 
         onClick={toogleShow} />}
        <Row>
          { projectsList.length == 0 ?
           <Col span={6} offset={8}>
           <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
              height: 60,
            }}
            description={
            <span>
              Aucun projet trouvé
            </span>
          }
          >
          <Button type="primary" onClick={toogleShow}>Créer un projet</Button>
           </Empty>
          </Col>
          :
          <>
            {projectsList.map((project:any) => (
              <Project key={project._id} project={project} updateData={updateData} toggle={toggle} remove ={remove}/>
            ))}
          </>
          }
        </Row>
      </>
      : <>
        <div className="add-project-container">
          <Addroject onAdded={toogleShow}/>
          </div>
        </>
    }
    </>
  );
}

export default ProjectList;
