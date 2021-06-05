import React, { Component } from 'react';
import { userData } from '../../models/user'
import { onEvent , emitEvent } from '../../socket'
import  ChatBox from './partials/ChatBox'
import  UserList from './partials/UserList'
import { Grid, GridItem } from "@chakra-ui/react"
import './styles.scss';
interface userData {
  id: number,
  messages: any,
  unread:any
}
type ChatState = {
  users: any,
  userChatData: any,
  user: any, // Signed-In User
  selectedUserIndex: any,
  showChatBox: boolean, // For small devices only
  showChatList: boolean, // For small devices only
  error: boolean,
  errorMessage: string,
  loading: boolean
}
type ChatProps = {
  id: any,
  name: any
}
class Chat extends Component<ChatProps, ChatState> {

  state: ChatState = {
    users: [],
    userChatData: [],
    user: null, 
    selectedUserIndex: null,
    showChatBox: false,
    showChatList: true,
    error: false,
    errorMessage: "",
    loading: false
  }

  componentDidMount() {
    let user :any = userData.find(u => u.name === localStorage.getItem('name'));
    this.setState({ users: userData })
    emitEvent("sign-in",user)
     let friends :any =  userData.filter((u:any) => u.id !== user.id)
    this.setState({ user :user });
    this.setState({ userChatData : friends });
    this.setupSocketListeners();
  }
   setupSocketListeners() {
    onEvent("message", this.onMessageRecieved.bind( this));
    onEvent("reconnect", this.onReconnection.bind(this));
    onEvent("disconnect", this.onClientDisconnected.bind(this));
  }
  onClientDisconnected() {
     console.log("Connection Lost from server please check your connection.");
  }
  onReconnection() {
    if (this.state.user) {
      emitEvent("sign-in", this.state.user);
      console.log("Connection Established.", "Reconnected!");
    }
  }
  onMessageRecieved(message:any) {
    let userChatData = this.state.userChatData;
    let messageData = message.message;
    let targetId:any;
    if (message.from === this.state.user.id) {
      messageData.position = "right";
      targetId = message.to;
    } else {
      messageData.position = "left";
      targetId = message.from;
    }
    let targetIndex = userChatData.findIndex(u => u.id === targetId);
    if (!userChatData[targetIndex].messages) {
      userChatData[targetIndex].messages = [];
    }
    if (targetIndex !== this.state.selectedUserIndex) {
      if (!userChatData[targetIndex].unread) {
        userChatData[targetIndex].unread = 0;
      }
      userChatData[targetIndex].unread++;
    }
    userChatData[targetIndex].messages.push(messageData);
    this.setState({ userChatData });
  }
  toggleViews() {
    this.setState({
      showChatBox: !this.state.showChatBox,
      showChatList: !this.state.showChatList
    });
  }

  /**
   *
   * handles if user clickes on ChatItem on left.
   */
  onChatClicked(e:any) {
    this.toggleViews();
    let users = this.state.userChatData;
    for (let index = 0; index < users.length; index++) {
      if (users[index].id === e.user.id) {
        users[index].unread = 0;
        this.setState({ selectedUserIndex: index, userChatData: users });
        return;
      }
    }
  }
  /**
   * creates message in a format in which messageList can render.
   * position is purposely omitted and will be appended when message is received.
   */
  createMessage(text:string) {
    let message = {
      to: this.state.userChatData[this.state.selectedUserIndex].id,
      message: {
        type: "text",
        text: text,
        date: +new Date(),
        className: "message"
      },
      from: this.state.user.id
    };
    emitEvent("message", message);
  }
  render() {
     let chatBoxProps = this.state.showChatBox
      ? {
          xs: 12,
          sm: 12
        }
      : {
          xsHidden: true,
          smHidden: true
        };

    let chatListProps = this.state.showChatList
      ? {
          xs: 12,
          sm: 12
        }
      : {
          xsHidden: true,
          smHidden: true
        };

    return (
      <React.Fragment>
    <Grid
  h="200px"
  templateRows="repeat(2, 1fr)"
  templateColumns="repeat(5, 1fr)"
  gap={4}
>
  <GridItem rowSpan={2} colSpan={1}>
   <UserList userData={this.state.userChatData}
          onChatClicked={this.onChatClicked.bind(this)}
              />
    </GridItem>

    <GridItem rowSpan={4} colSpan={1}>
    <ChatBox signedInUser={this.state.user} onSendClicked={this.createMessage.bind(this)}
           onBackPressed={this.toggleViews.bind(this)} targetUser={
             this.state.userChatData[this.state.selectedUserIndex]
            }
    />
  </GridItem>
</Grid>
        
      </React.Fragment>
    );
  }
}

export default Chat;
