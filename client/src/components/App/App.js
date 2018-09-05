import React from "react";
import PropTypes from "prop-types";
import Eos from 'eosjs';
import './App.css';
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import Messages from '../Messages/Messages';
import ChatInput from '../ChatInput/ChatInput';
import base from "../../base";
import { Layout, Menu, Breadcrumb } from 'antd';

const { Content, Footer } = Layout;


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


<Layout className="layout" id="eos-chat-app-test"> 
<HeaderComponent userId={this.state.userId} chatRoomName={this.state.chatRoomName} />
<Content style={{ padding: '0 50px' }}>
  <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
    <Messages messages={this.state.messages} />
    <ChatInput userId={this.state.userId} chatRoomName={this.state.chatRoomName} sendMessage={this.sendMessage} />
  </div>
</Content>
<Footer style={{ textAlign: 'center' }}>
  EOS Hackathon team - test chat app
</Footer>
</Layout>
    );  
}
}
export default App;

