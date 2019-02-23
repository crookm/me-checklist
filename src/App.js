import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ReactGA from "react-ga";

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

    ReactGA.initialize("UA-135056719-1");

    this.pageViewTimerStart = new Date();

    this.handleTrackEvent = this.handleTrackEvent.bind(this);
    this.handleTrackRemoteSync = this.handleTrackRemoteSync.bind(this);
    this.handleTrackPageView = this.handleTrackPageView.bind(this);
    this.handleSetPageTitle = this.handleSetPageTitle.bind(this);
    this.handleLoadUserData = this.handleLoadUserData.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleGetUI = this.handleGetUI.bind(this);
    this.handleSetUI = this.handleSetUI.bind(this);

    this.downstreamHandlers = {
      handleTrackEvent: this.handleTrackEvent,
      handleTrackRemoteSync: this.handleTrackRemoteSync,
      handleTrackPageView: this.handleTrackPageView,
      handleSetPageTitle: this.handleSetPageTitle,
      handleLoadUserData: this.handleLoadUserData,
      handleToggle: this.handleToggle,
      handleGetUI: this.handleGetUI,
      handleSetUI: this.handleSetUI
    };
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

  // functions for downstream pages
  handleTrackEvent(category, action, label) {
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  }

  handleTrackRemoteSync(game, count, interacted) {
    ReactGA.event({
      category: "Checklist",
      action: "Synced to cloud",
      label: `G${game}`,
      value: count,
      nonInteraction: !interacted
    });
  }

  handleTrackPageView() {
    this.pageViewTimerStart = new Date();
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

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

        ReactGA.event({
          category: "Checklist",
          action: "Loaded local completed missions data",
          label: `G${game}`,
          value: completed,
          nonInteraction: true
        });

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

    ReactGA.event({
      category: "Checklist",
      action: "Toggle mission completion status",
      label: `G${game}#${key}`,
      value: toggled.done ? 1 : 0
    });

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

      let uiTrackIgnore = ["syncLink", "syncLast"];
      if (!uiTrackIgnore.includes(key)) {
        // ignore sensitive UI settings like the sync passphrase
        ReactGA.event({
          category: "UI",
          action: "Toggled UI setting",
          label: key,
          value: value ? 1 : 0
        });
      }

      if (key === "syncLink") {
        if (value) {
          // linked to account
          ReactGA.event({
            category: "UI",
            action: "Connected cloud sync account"
          });
        } else {
          // unlinked
          ReactGA.event({
            category: "UI",
            action: "Disconnected cloud sync account"
          });
        }
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

export default App;
