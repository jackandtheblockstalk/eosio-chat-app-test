import React  from 'react'
import PropTypes from "prop-types";


class ChatInput extends React.Component {
  messageRef = React.createRef();
  
  static propTypes = {
    sendMessage: PropTypes.func,
    userId: PropTypes.string,
    chatRoomName: PropTypes.string
  };

  createMessage = event => {
    // 1.  stop the form from submitting
    event.preventDefault();
    const message = {
      messageText: this.messageRef.current.value,
      messageId: `message-${Date.now()}-${this.props.chatRoomName}-${this.props.userId}`,
      dateSent: Date.now(),
      userId: this.props.userId,
      chatRoomName: this.props.chatRoomName
    };
    this.props.sendMessage(message);
    // refresh the form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="chat-input" onSubmit={this.createMessage}>
        <input type="text"
          name="name"
          ref={this.messageRef}
          placeholder="Write a message..."
          required />
        <button type="submit">+ Send Message</button>
      </form>
    );
  }
}



export default ChatInput;