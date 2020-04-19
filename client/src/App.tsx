import React from "react";
import "./App.css";
import Playlists from "./components/Playlists";
import LinkAccount from "./components/LinkAccount";
import Home from "./components/Home";
import Tracks from "./components/Tracks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";
function App() {
  return (
    <Router>
      <Switch>
        <UserContextProvider>
          <>
            <Route path="/" exact component={Home}></Route>
            <Route path="/playlists">
              <Playlists />
            </Route>
            <Route path="/playlist/:id">
              <Tracks />
            </Route>
            <Route path="/linkAccount">
              <LinkAccount />
            </Route>
          </>
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
