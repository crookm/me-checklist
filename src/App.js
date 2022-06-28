import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";

// error pages
import NotFound from "./_pages/_errors/NotFound";

// pages
import Home from "./_pages/Home";
import About from "./_pages/About";
import Game from "./_pages/Game";

class App extends Component {
  constructor(props) {
    super(props);

    this.isLocal = Boolean(
      window.location.hostname === "localhost" ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === "[::1]" ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    this.pageViewTimerStart = new Date();

    this.handleSetPageTitle = this.handleSetPageTitle.bind(this);
    this.handleLoadUserData = this.handleLoadUserData.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleGetUI = this.handleGetUI.bind(this);
    this.handleSetUI = this.handleSetUI.bind(this);

    this.downstreamHandlers = {
      handleSetPageTitle: this.handleSetPageTitle,
      handleLoadUserData: this.handleLoadUserData,
      handleToggle: this.handleToggle,
      handleGetUI: this.handleGetUI,
      handleSetUI: this.handleSetUI
    };

    this.history = this.configureHistory();
  }

  componentDidMount() {
    if (typeof Storage !== "undefined") {
      if (typeof window.localStorage["ui_settings"] === "string") {
        if (!JSON.parse(window.localStorage["ui_settings"]).showHelp) {
          this.setState({ showHelp: false });
        }
      }
    }
  }

  configureHistory() {
    // setup the browser history for the router, so we don't 404 as a PWA
    return window.matchMedia("(display-mode: standalone)").matches
      ? createHashHistory()
      : createBrowserHistory();
  }

  // functions for downstream pages
  handleSetPageTitle(name) {
    document.title = `${name} / Mass Effect Checklist`;
  }

  handleLoadUserData(game, def, set) {
    if (typeof Storage !== "undefined") {
      if (typeof window.localStorage[game] === "string") {
        let data = JSON.parse(window.localStorage[game]);

        let completed = 0;

        let hydrated = Object.keys(def).reduce((out, current) => {
          out[current] = def[current];
          // json stores date objects as strings, so have to convert back
          out[current].completion = {
            done: data[current] ? data[current].done : false,
            datetime: data[current] ? new Date(data[current].datetime) : null
          };

          if (out[current].completion.done) completed++;
          return out;
        }, {});

        set(hydrated);
      }
    }
  }

  handleToggle(game, key, items, set) {
    let toggled = {
      done: !items[key].completion.done,
      datetime: new Date()
    };

    items[key].completion = toggled;

    if (typeof Storage !== "undefined") {
      window.localStorage[game] = JSON.stringify(
        Object.keys(items).reduce((out, current) => {
          out[current] = items[current].completion;
          return out;
        }, {})
      );
    }

    set(items); // return the new items so caller can update state
  }

  handleGetUI(key) {
    if (typeof Storage !== "undefined") {
      if (typeof window.localStorage["ui_settings"] === "string") {
        return JSON.parse(window.localStorage["ui_settings"])[key];
      } else {
        return undefined;
      }
    }
  }

  handleSetUI(key, value) {
    if (typeof Storage !== "undefined") {
      let ui_settings = {};

      if (typeof window.localStorage["ui_settings"] === "string") {
        ui_settings = JSON.parse(window.localStorage["ui_settings"]);
      }

      ui_settings[key] = value;
      window.localStorage["ui_settings"] = JSON.stringify(ui_settings);
    }
  }

  render() {
    return (
      <Router history={this.history}>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Home
                {...props}
                isLocal={this.isLocal}
                downstreamHandlers={this.downstreamHandlers}
              />
            )}
          />
          <Route
            path="/about"
            render={props => (
              <About
                {...props}
                isLocal={this.isLocal}
                downstreamHandlers={this.downstreamHandlers}
              />
            )}
          />
          <Route
            path="/one"
            render={props => (
              <Game
                {...props}
                game={1}
                isLocal={this.isLocal}
                downstreamHandlers={this.downstreamHandlers}
              />
            )}
          />
          <Route
            path="/two"
            render={props => (
              <Game
                {...props}
                game={2}
                isLocal={this.isLocal}
                downstreamHandlers={this.downstreamHandlers}
              />
            )}
          />
          <Route
            path="/three"
            render={props => (
              <Game
                {...props}
                game={3}
                isLocal={this.isLocal}
                downstreamHandlers={this.downstreamHandlers}
              />
            )}
          />
          <Route
            render={props => (
              <NotFound
                {...props}
                isLocal={this.isLocal}
                downstreamHandlers={this.downstreamHandlers}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
