import React ,{useEffect , useState }from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import TaskAdd from './task-add';
import TaskItem from './task-item';
const TaskList = ({storyId}) =>{
    const storyTasks = useStoreState((state:any) => state.storyTasks.tasks);
    const initialize = useStoreActions((actions:any) => actions.storyTasks.initialize);
    const storyTaskList = Object.values(storyTasks);
    useEffect(() => {
        initialize(storyId);
    }, [storyId])
    return <>
   
    {storyTaskList.map((task:any) => (
        <TaskItem key={task._id} task={task}   />
     ))}
    <TaskAdd storyId ={storyId}/></>
}
export default TaskList;