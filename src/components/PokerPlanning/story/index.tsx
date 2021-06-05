import React from 'react';
import { render } from 'react-dom';
import { List } from 'immutable'
import { Button } from '@chakra-ui/react'
import socketIOClient from "socket.io-client"
import { Member, State } from '../../../models/user'
type StoriesProps = {
  members: List<Member>,
  state: State,
  toggleActiveReveal:any,
  socket: socketIOClient.Socket,
  revealCard:boolean,
  resetti:any
}

type StoryModel = {
  id:number,
  title:string,
  description:string,
  url : string
}
type StoryState = {
    stories:Array<StoryModel>,
    activeStory:number,
    storyId: number,
    nextId:number
}
type StoryItemProps = {
  storyId:number,
  nextId:number
}

type StoryProps= {
  storyId:number,
  nextId:number,
  onNext:any,
  toggleActiveReveal:any,
  revealCard:boolean,
  resetti:any,
  members: List<Member>
}
const data = [
  {
    id: 1,
    title: 'SapientNitro',
    description: 'I used to work at SapientNitro.',
    url: 'https://placeimg.com/150/150/nature/sepia'
  },
  {
    id: 2,
    title: 'Razorfish',
    description: 'SapientNitro merged with Razorfish.',
    url: 'https://placeimg.com/150/150/animals/sepia'
  },
  {
    id: 3,
    title: 'SapientRazorfish',
    description: 'Now I work at SapientRazorfish.',
    url: 'https://placeimg.com/150/150/tech/sepia'
  },
  {
    id: 4,
    title: 'SazzzzaaaapientRazorfish',
    description: 'Now I work at SapientRazorfish.',
    url: 'https://placeimg.com/150/150/tech/sepia'
  },
  {
    id: 5,
    title: 'SapidqqqsqqentRazorfish',
    description: 'Now I work at SapientRazorfish.',
    url: 'https://placeimg.com/150/150/tech/sepia'
  },
  {
    id: 6,
    title: 'sdqsdqdqs',
    description: 'Now I work at SapientRazorfish.',
    url: 'https://placeimg.com/150/150/tech/sepia'
  },
  {
    id: 7,
    title: 'SapientRazorfish',
    description: 'Now I work at SapientRazorfish.',
    url: 'https://placeimg.com/150/150/tech/sepia'
  },
];



class StoryItem extends React.Component<StoryItemProps,{}> {

   render() {
     const {storyId , nextId} =this.props
     return(
     <div>
       <div>Story Actuel :{storyId}</div>
        <div>Story Suivant : {nextId}</div>
     </div>)
  }
}


class Story extends React.Component<StoryProps,{}> {
  render() {
    const {
      storyId,
      nextId,
      onNext,
      toggleActiveReveal,
      revealCard,
      resetti,
      members
    } = this.props
    const goToNextStory = () =>{
          this.props.onNext()
    }
    const getEstimation = () =>{
      if(members.filter(mem => mem.vote.length <= 0).size === members.size){

      }
      let votes = [1,1,1,1];
      if( votes.every( (val, i, arr) => val === arr[0] ) ) return votes[0]
      else {

      }
       
    }
    /**/
    const handleDiffVotes = () =>{
        const a = [1,1,3,1,5,5]
        console.log(mediane(a))
    }

  function mediane(tab:any) {
  //Je trie mon tableau
   tab=tab.sort();
   //Je stocke le nombre de valeurs du tableau afin d'éviter de le recalculer tout le temps
   var nb:string=tab.length;
   //Idem pour l'indice du milieu
   var milieu = parseInt(nb/2); //exemple, si j'ai 3 valeurs, nb/2 retourne 1.5 et parseInt() récupère la partie entière donc 1. L'indice du milieu du tableau est bien 1 (un tableau commence avec un indice 0)
   if(nb%2==1) { //S'il y a un nombre impair de valeurs, je retourne la valeur du milieu
      return   Math.fround(tab[milieu]);
   }
   else { //S'il y a un nombre pair de valeurs, je retourne la demi-somme des deux valeurs du milieu
      return Math.fround((tab[milieu]+tab[milieu-1])/2);
   }
}

    return (
      <div>

       <Button  colorScheme="blue" onClick={ handleDiffVotes } >  Custom </Button>
       <Button  colorScheme="blue" onClick={ handleDiffVotes } >  Mettre de coté </Button>
       <Button onClick={ toggleActiveReveal } disabled={members.filter(mem => mem.vote.length <= 0).size === members.size}>Reveal</Button>
         { 
         revealCard &&
          <div >
              <Button  colorScheme="blue" onClick={ goToNextStory } > Skip story </Button>
              <Button  colorScheme="blue" onClick={_ => resetti()}>Reset votes</Button>
          </div>
         }  
       <StoryItem  storyId={this.props.storyId} nextId={this.props.nextId}/> 
      </div>
    );
  }
}
export default  class Stories extends React.Component<StoriesProps, StoryState> {

  state : StoryState= {
    stories: [],
    activeStory: 0,
    storyId: 0,
    nextId : 0
  }

  componentDidMount() {
     this.setState({ 
      stories: data,
      activeStory: data.length,
      storyId:data[data.length-1]['id'],
      nextId :data[data.length-2]['id']
    });
  }

  handleNext = () => {
    
    var arr = this.state.stories.length;
    var idx :number = this.state.activeStory;
    if (idx === 0) idx = arr - 1; else  idx = idx -1; 
      this.setState({
        activeStory: idx,
        storyId: this.state.stories[idx].id,
        nextId : this.state.stories[idx].id
      }); 
   
  
  }
  render() {
     const { members , resetti , toggleActiveReveal , revealCard } = this.props
    const nextId = (idx:any, arr:any) => {
     if (idx === 0) idx = arr.length - 1; else  idx = idx - 1;
      return arr[idx].id; 
    }
    return (
        <div>
          <Story 
            storyId={this.state.storyId}
            revealCard ={revealCard}
            toggleActiveReveal ={toggleActiveReveal}
            members ={members}
            resetti ={resetti}
            nextId={nextId(this.state.activeStory, data)}
            onNext={this.handleNext}
          />
        </div>

      );
  }
}
