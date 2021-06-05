import React ,{ useState } from 'react'
import { Member, State } from '../../../models/user'
import { List } from 'immutable'
import { Button } from '@chakra-ui/react'
import socketIOClient from "socket.io-client"
import Stories from '../story/index'
type ReavelProps = {
  members: List<Member>,
  state: State,
  toggleActiveReveal:any,
  toggleDesactiveReveal:any,
  socket: socketIOClient.Socket,
  revealCard:boolean
}

const Reveal = (props: React.PropsWithChildren<ReavelProps>): JSX.Element => {

  const { members, state , socket , toggleActiveReveal , toggleDesactiveReveal , revealCard } = props
  const resetti = (): void => {
    socket.emit('reset', state.members.find(m => m.id === state.id))
    toggleDesactiveReveal()
  }
  
  return (
    <div >
      <Stories members={members} resetti={resetti} revealCard={revealCard} toggleActiveReveal={toggleActiveReveal} />
    </div>
  )
}

export default Reveal