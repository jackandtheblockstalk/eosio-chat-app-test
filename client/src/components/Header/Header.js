import React from "react";
import PropTypes from "prop-types";

const Header = props => (
  <header className="top">
    <h1>
      EOS Chat App - TEST
    </h1>
    <h3 className="tagline">
      <span>(User : {props.userId}) Chatting in {props.chatRoomName} chatroom</span>
    </h3>
  </header>
);

Header.propTypes = {
  userId: PropTypes.string.isRequired,
  chatRoomName: PropTypes.string.isRequired
};

export default Header;
