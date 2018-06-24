import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// error pages
import NotFound from "./_pages/_errors/NotFound";

// pages
import Home from "./_pages/Home";
import About from "./_pages/About";
import Game from "./_pages/Game";

class App extends Component {
  constructor(props) {
    super(props);

    this.migrateLSKeys({
      one: 1,
      two: 2,
      three: 3
    }); // migrate checklist localstorage to new key dtypes

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

    this.handleTrackOutboundLink = this.handleTrackOutboundLink.bind(this);
    this.handleTrackPageView = this.handleTrackPageView.bind(this);
    this.handleSetPageTitle = this.handleSetPageTitle.bind(this);
    this.handleLoadUserData = this.handleLoadUserData.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleGetUI = this.handleGetUI.bind(this);
    this.handleSetUI = this.handleSetUI.bind(this);

    this.downstreamHandlers = {
      handleTrackOutboundLink: this.handleTrackOutboundLink,
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

  migrateLSKeys(conv) {
    // migrate keys in local browser storage
    Object.entries(conv).forEach(([oldKey, newKey]) => {
      if (typeof Storage !== "undefined") {
        if (typeof window.localStorage[oldKey] === "string") {
          window.localStorage[newKey] = window.localStorage[oldKey];
          delete window.localStorage[oldKey];

          window.appInsights.trackEvent("migrateLocalStorageKey", {
            oldKey: oldKey,
            newKey: newKey,
            dev: this.props.isLocal
          });
        }
      }
    });
  }

  // functions for downstream pages
  handleTrackOutboundLink(e, aiProperties, aiMetrics) {
    window.appInsights.trackEvent(
      "linkedOutbound",
      {
        dev: this.isLocal,
        href: e.target.href,
        target: e.target.target,
        ...aiProperties
      },
      {
        secsToClickFromPageReady:
          new Date(new Date() - this.pageViewTimerStart).getTime() / 1000,
        ...aiMetrics
      }
    );
  }

  handleTrackPageView() {
    this.pageViewTimerStart = new Date();
    window.appInsights.trackPageView(undefined, undefined, {
      dev: this.props.isLocal
    });
  }

  handleSetPageTitle(name) {
    document.title = `${name} / Mass Effect Checklist`;
  }

  handleLoadUserData(game, def, set) {
    if (typeof Storage !== "undefined") {
      if (typeof window.localStorage[game] === "string") {
        let data = JSON.parse(window.localStorage[game]);

        let analyticsData = {
          completedMissionsAtLoad: 0,
          firstCompletedMissionAtLoad: null,
          lastCompletedMissionAtLoad: null
        };

        let hydrated = Object.keys(def).reduce((out, current) => {
          out[current] = def[current];
          // json stores date objects as strings, so have to convert back
          out[current].completion = {
            done: data[current] ? data[current].done : false,
            datetime: data[current] ? new Date(data[current].datetime) : null
          };

          if (out[current].completion.done) {
            analyticsData.completedMissionsAtLoad++;

            if (
              out[current].completion.datetime <
                analyticsData.firstCompletedMissionAtLoad ||
              !analyticsData.firstCompletedMissionAtLoad
            )
              // this item is earlier than the earliest item, or the earliest item hasn't been set yet
              analyticsData.firstCompletedMissionAtLoad =
                out[current].completion.datetime;
            if (
              out[current].completion.datetime >
                analyticsData.lastCompletedMissionAtLoad ||
              !analyticsData.lastCompletedMissionAtLoad
            )
              // this item is later than the latest item, or the latest item hasn't been set yet
              analyticsData.lastCompletedMissionAtLoad =
                out[current].completion.datetime;
          }

          return out;
        }, {});

        window.appInsights.trackEvent(
          "loadUserData",
          {
            game: game,
            firstCompletedMissionAtLoad:
              analyticsData.firstCompletedMissionAtLoad,
            lastCompletedMissionAtLoad:
              analyticsData.lastCompletedMissionAtLoad,
            dev: this.props.isLocal
          },
          {
            completedMissionsAtLoad: analyticsData.completedMissionsAtLoad
          }
        );

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

    window.appInsights.trackEvent("toggleCompleteMission", {
      game: game,
      itemKey: key,
      itemTitle: items[key].title.replace(/<\/?[^>]+(>|$)/g, ""),
      itemStatus: toggled.done,
      dev: this.props.isLocal
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

      window.appInsights.trackEvent("toggleUISetting", {
        setting: key,
        value: value,
        dev: this.isLocal
      });
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
