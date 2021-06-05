
import React, { Component ,useState } from "react";

import './styles.scss'; 
import AuthService from "../../services/auth.service";
import { Input , Button } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { useHistory } from "react-router-dom";

type userState = {
 	name: string
}
type userProps ={

}

function Planning() {
    let history = useHistory();
    const [name, setName] = useState('');
    const add = (data : string) =>{
    }
    return (
      <Container>
      <Input
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <Button onClick={() => add(name)} colorScheme="blue">Se connecter</Button>
  
      </Container>
    );
  
}
export default Planning;