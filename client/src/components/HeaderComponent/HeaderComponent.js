import React from "react";
import PropTypes from "prop-types";
import { Menu } from 'antd';
import { NavLink } from "react-router-dom";

const HeaderComponent = props => (
  <div className="header-container" >
  <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">
        <NavLink to="/" className="nav-text">Logout</NavLink>
      </Menu.Item>
      <Menu.Item key="2"  disabled={true}>
        (User : {props.userId}) Chatting in {props.chatRoomName} chatroom</Menu.Item>
    </Menu>
  </div>
);

HeaderComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  chatRoomName: PropTypes.string.isRequired
};

export default HeaderComponent;
