import React from "react";
import { render } from "react-dom";
import Router from "./components/Router/Router";
import "./css/style.css";
import registerServiceWorker from './registerServiceWorker';



render(<Router />, document.querySelector("#main"));
registerServiceWorker();
