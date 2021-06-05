import React from 'react';
import ProjectList from './items';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BoardLink from '../../partials/BoardLink';
interface RouteParams {
    id: string
  }
  
function Board(){
  let { id } = useParams<RouteParams>();

  return(
    <div className="container project-container">
          <BoardLink  projectId ={id}/>
          Tableau de
    </div>
  );
}

export default Board;