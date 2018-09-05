import React from "react";
import PropTypes from "prop-types";
import Eos from 'eosjs';
import './App.css';
import Header from '../Header/Header'
import Messages from '../Messages/Messages';
import ChatInput from '../ChatInput/ChatInput';
import base from "../../base";


class App extends React.Component {
  state = {
    userId: '',
    chatRoomName: '',
    messages: {}
  }

  sendMessage = message => {
    console.log('Send message');
    const messages = {...this.state.messages};
    messages[`message${Date.now()}`] = message;
    this.setState({ messages });
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.setState({ userId: params.userId, chatRoomName: params.chatRoomName });

    this.ref = base.syncState(`${params.chatRoomName}/messages`, {
      context: this,
      state: "messages"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
        <div id="eos-chat-app-test">
          <Header userId={this.state.userId} chatRoomName={this.state.chatRoomName} />
          <Messages messages={this.state.messages} />
          <ChatInput userId={this.state.userId} chatRoomName={this.state.chatRoomName} sendMessage={this.sendMessage} />
        </div>
        
      );
    }
  
}

export default App;

