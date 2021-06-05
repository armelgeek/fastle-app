import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Input , Button } from "@chakra-ui/react"

import './styles.scss';
function Todo() {
	const items = useStoreState((state:any) => state.todos.items);
    const add = useStoreActions((actions:any) => actions.todos.add);
    const [newTodo, setNewTodo] = useState('');
    useEffect(() => setNewTodo(''), [items]);

	return (
  		 <div>
     		 <h2>Todo List</h2>
      		 <ul>
        		{items.map((todo, idx) => (
          			<li key={idx}>{todo}</li>
        		))}
      		 </ul>
      		<Input
        		onChange={e => setNewTodo(e.target.value)}
        		value={newTodo}
      		/>
      		<Button onClick={() => add(newTodo)} colorScheme="blue">Add</Button>
  
    	</div>
  	)
}

export default Todo;
