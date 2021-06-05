import React, { Component } from "react";
import { Input , Button } from "@chakra-ui/react"
import {
  MessageList,
  Navbar as NavbarComponent,
  Avatar
} from "react-chat-elements";
type ChatBoxProps ={
  onSendClicked:any,
  targetUser:any,
  onBackPressed:any,
  signedInUser:any
}
type ChatBoxState ={
  messageText:string
}
export default class ChatBox extends Component<ChatBoxProps,ChatBoxState> {
  state = {
    messageText: ""
  };
  onSendClicked() {
    if (!this.state.messageText) {
      return;
    }
    this.props.onSendClicked(this.state.messageText);
    this.setState({ messageText: "" });
  }
  onMessageInputChange(e:any) {
    this.setState({ messageText: e.target.value });
  }
  /**
   *
   * @param {KeyboardEvent} e
   *
   * listen for enter pressed and sends the message.
   */
  onMessageKeyPress(e:any) {
    if (e.key === "Enter") {
      this.onSendClicked();
    }
  }

  render() {
    return (
      <div>
        {this.props.targetUser ? (
          <div>
            <NavbarComponent
              left={
                <div>
                  <div className="col-6 ">
                    <p className="navBarText">
                      <span 
                        onClick={this.props.onBackPressed}
                      > onBack</span>  
                    </p>
                  </div>
                  <Avatar
                    src={null}
                    alt={"logo"}
                    size="large"
                    type="circle flexible"
                  />
                  <p className="navBarText">{this.props.targetUser.name}</p>
                </div>
              }
            />
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.props.targetUser.messages}
            />
          <div className="form-group">
          <div className="input-group">
                <input 
                  type="text"
                  value={this.state.messageText}
                  onChange={this.onMessageInputChange.bind(this)}
                  onKeyPress={this.onMessageKeyPress.bind(this)}
                  placeholder="Type a message here (Limit 3000 characters)..."
                  ref="messageTextBox"
                  className="messageTextBox"
                  autoFocus
                />
                  <button
                    disabled={!this.state.messageText}
                    className="sendButton"
                    onClick={this.onSendClicked.bind(this)}
                  >
                    Send
                  </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h1>Hello</h1>
              <p>Select a friend to start a chat.</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
