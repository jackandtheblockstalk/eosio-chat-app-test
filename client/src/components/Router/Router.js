import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App/App"
import Login from '../Login/Login'
import NotFound from "../NotFound/NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/:chatRoomName/:userId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
