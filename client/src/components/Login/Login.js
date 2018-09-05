import React from "react";
import PropTypes from "prop-types";
import { getChatroomNames } from "../../helpers";

class Login extends React.Component {
  myUsername = React.createRef();
  

  static propTypes = {
    history: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {chatRoomName: 'elves'};
    this.handleChange = this.handleChange.bind(this);
    this.goToChat = this.goToChat.bind(this);
  }

  handleChange(event) {
    this.setState({chatRoomName: event.target.value});
  }



  goToChat = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const userName = this.myUsername.current.value;
    debugger;
    console.log(this.state.chatRoomName);
    const chatroomName = this.state.chatRoomName
    // 3. Change the page to /chatapp/whatever-they-entered
    this.props.history.push(`/${chatroomName}/${userName}`);
  };
  render() {
    return (
      <form className="login" onSubmit={this.goToChat}>
        <h2>Pick a chatroom</h2>
        <select name="chatroom" value={this.state.value} onChange={this.handleChange} required>
          {getChatroomNames().map((e, key) => {
              return <option key={key} value={e}>{e}</option>;
          })}
        </select>
        <h2>Please Enter A Username</h2>
        <input
          type="text"
          ref={this.myUsername}
          required
          placeholder="Chat Username"
          defaultValue=""
        />
        <button type="submit">Start chat →</button>
      </form>
    );
  }
}

export default Login;
