import React, { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"
import { List } from 'immutable'
import { Member, State } from '../../models/user'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator'
import Layout from './layout'
import Cards from './cards'
import Members from './members'
import Reveal from './reveal'
import { useHistory, useParams } from 'react-router-dom'

export const uniqueNamesConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: '-'
}
type RevealState ={
  isReveal:boolean
}
function PokerPlanning(props:any){
  const endpoint: string = `${process.env.NODE_ENV !== 'development' ? window.location.origin : 'http://localhost:4001'}`

  const { room } = props.match.params
  const socket = socketIOClient(endpoint, {
    secure: true,
    transports: [ 'websocket' ]
  })
  const [ state, setState ] = useState<State>({
    id: Math.floor(Math.random() * 100001),
    members: List<Member>(),
  })
  const [ name, setName ] = useState<string>(localStorage.getItem('name') || uniqueNamesGenerator(uniqueNamesConfig))

  const [reveal, setReveal ] = useState<RevealState>({
     isReveal:false
  });
  const toggleActiveReveal = () =>{
    setReveal({
      isReveal : true
    })
  }
  const toggleDesactiveReveal = () =>{
    setReveal({
      isReveal : false
    })
  }
  const updateMemberList = (payload: { id: string, members: Member[] }): void => 
    setState({
      ...state,
      members: state.members.merge(List<Member>(payload.members))})

  const member_updated = (payload: Member[]) =>
    setState(s0 => ({
      ...s0,
      members: List<Member>(payload)
    }))

  const memberLeft = (payload: Member[]): void => 
    setState(s0 => ({
      ...s0,
      members: List<Member>(payload)
    }))

  useEffect(() => {
    const member: Omit<Member, '_id'> = {
      id: state.id,
      name,
      vote: '',
      room
    }
    console.log(member)
    // Send new member to remote
    socket.emit('join', member)

    // Update local member list because a new member joined
    socket.on('member_joined', (payload: { id: string, members: Member[] }) => updateMemberList(payload))

    // Update local member list because a property of a member has been updated
    socket.on('member_updated', (payload: Member[]) => member_updated(payload))

    // Update local member list because a vote was casted
    socket.on('new_cast', (payload: Member[]) => member_updated(payload))

    // Update local member list because the votes were resetted
    socket.on('reset_cast', (payload: Member[]) => member_updated(payload))

    // Update local member list because a member disconnected
    socket.on('member_left', (data: Member[]) => memberLeft(data))


    socket.on('disconnect', (reason: string) => {
      if (reason === 'io server disconnect' || reason === 'transport close') {
       console.log('disconnected room')
      }
    })

    socket.on('reconnect', (attemptNumber: number) => {
      socket.emit('join', member)
      console.log('join room')
    })
    // eslint-disable-next-line
  }, [])
  
  return (
    <Layout>

      <Cards state={state} socket={socket} />
      <Members members={state.members} state={state} socket={socket} revealCard={ reveal.isReveal } />
      <Reveal 
            members={state.members}
            state={state} socket={socket}
            toggleActiveReveal={toggleActiveReveal}
            toggleDesactiveReveal={toggleDesactiveReveal}
            revealCard={ reveal.isReveal }
      />
    </Layout>
  )
}

export default PokerPlanning