import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'
function BoardLink({projectId}){
  return(
        <>
           <ul className="board-link">
               <li><Link to={"/tableau-de-bord/"+projectId } >Tableau de bord</Link></li>
               <li><Link to={"/backlog/"+projectId } >Backlog</Link></li>
               <li><Link to={"/project-board/"+projectId } >Sprint Actif</Link></li>
               <li><Link to={"/tickets/"+projectId } >Tickets</Link></li>
           </ul>
       </>
  );
}

export default BoardLink;