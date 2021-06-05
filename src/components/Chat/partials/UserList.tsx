import React, { Component } from "react";
import  {ChatList } from "react-chat-elements";
import { Input , Button } from "@chakra-ui/react"
type UserState = {
  searchQuery:any,
}
type UserProps= {
  showSignInList?:any,
  userData:any,
  onChatClicked:any,
  onUserClicked?:any
}
export default class UserList extends Component<UserProps,UserState> {
  state : UserState = {
    searchQuery: null
  };
  componentDidMount() {}
  searchInput(e:any) {
    let value = e.target.value;
    let searchQuery = null;
    if (value) {
      searchQuery = value;
    }
    this.setState({ searchQuery });
  }
  getFilteredUserList() {
    return !this.state.searchQuery
      ? this.props.userData
    : this.props.userData.filter((user:any) =>
          user.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );
  }
  render() {
    let users = this.getFilteredUserList();

    return (
        <div>
        <div className="form-group">
          <Input
            type="text"
            placeholder="Search for a user here..."
            onInput={this.searchInput.bind(this)}
          />
        </div>
        {users.length ? (
          <ChatList
            className={!this.props.showSignInList ? "chat-list" : "user-list"}
            dataSource={users.map((f:any) => {

              let date = null;
              let subtitle = "";
              if (
                !this.props.showSignInList &&
                f.messages &&
                f.messages.length
              ) {
                let lastMessage = f.messages[f.messages.length - 1];
                date = new Date(lastMessage.timeStamp);
                subtitle =
                  (lastMessage.position === "right" ? "You: " : f.name + ": ") +
                  lastMessage.text;
              }
              return {
                avatar: `../../static/images/avatar/${f.id}.jpg`,
                title: f.name,
                subtitle: subtitle,
                date: date,
                unread: f.unread,
                user: f
              };
            })}
            onClick={
              !this.props.showSignInList
                ? this.props.onChatClicked
                : this.props.onUserClicked
            }
          />
        ) : (
          <div className="text-center no-users">No users to show.</div>
        )}
      </div>
    );
  }
}
