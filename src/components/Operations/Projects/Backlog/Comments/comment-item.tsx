import React ,{useState} from 'react';
import { Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useStoreActions } from 'easy-peasy';
import { Button } from 'antd';
import { FastleTextAreaEdit } from '../../../../hooks/FastleField';
function toogleItem(props){
    return    <div>{props.data.content} {props.data.createdAt}</div>
}
function CommentItem({comment}){
  const [contentState,setContentState] = useState(false);
  const remove = useStoreActions((actions:any) => actions.commentStories.remove);
  const patching = useStoreActions((actions:any) => actions.commentStories.patching);
  return(
    <div className="task-item-container" >
       <FastleTextAreaEdit
            name ={"content"}
            title={"Que faut-il faire ?"}
            data={comment}
            inputData={comment.content}
            action = {patching}
            toggleState={contentState}
            setToggleState ={setContentState}
            toggleContent={toogleItem }
            />
      { !contentState &&
      <>
       <Button type="default" onClick={(e) =>{
            setContentState(true)
        }}>Update</Button>
        <Button type="default" onClick={(e) =>{
          remove(comment._id)
        }}>Supprimer</Button>
      </>
      }
     </div>
  );
}

export default CommentItem;