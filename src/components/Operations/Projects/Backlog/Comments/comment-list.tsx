import React ,{useEffect , useState }from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CommentAdd from './comment-add';
import CommentItem from './comment-item';
import { onEvent } from '../../../../../socket';
const CommentList = ({storyId}) =>{
    const commentStories = useStoreState((state:any) => state.commentStories.comments);
    const initialize = useStoreActions((actions:any) => actions.commentStories.initialize);
    const commentStoriesList = Object.values(commentStories);
    
    useEffect(() => {
      initialize(storyId);
    }, [])
    return <>
    {commentStoriesList.map((comment:any) => (
        <CommentItem key={comment._id} comment={comment}   />
     ))}
    <CommentAdd storyId ={storyId}/></>
}
export default CommentList;
