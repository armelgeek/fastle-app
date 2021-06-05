import React from 'react';
import { Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useStoreActions } from 'easy-peasy';
import { Button } from 'antd';
import { FastleInputEdit } from '../../../../hooks/FastleField';
function TaskItem({task}){
 
const remove = useStoreActions((actions:any) => actions.storyTasks.remove);
const patching = useStoreActions((actions:any) => actions.storyTasks.patching);
  return(
    <div className="task-item-container" >
       <FastleInputEdit 
            name ={"title"}
            title={"Que faut-il faire ?"}
            data={task}
            inputData={task.title}
            action = {patching} />
       <Button type="default" onClick={(e) =>{
          remove(task._id)
        }}>Supprimer</Button>
        
    </div>
  );
}

export default TaskItem;