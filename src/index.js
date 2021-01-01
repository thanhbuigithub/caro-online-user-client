import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserProvider from "./provider/UserProvider";
import GameProvider from "./provider/GameProvider";
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <UserProvider>
    <GameProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameProvider>
  </UserProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
