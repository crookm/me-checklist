import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./_styles/GameChooser.css";

// error pages
import NotFound from "./_pages/_errors/NotFound";

// pages
import About from "./_pages/About";
import ME1 from "./_pages/ME1";
import ME2 from "./_pages/ME2";
import ME3 from "./_pages/ME3";

// assets
import LogoME1 from "./_assets/LogoME1";
import LogoME2 from "./_assets/LogoME2";
import LogoME3 from "./_assets/LogoME3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: true
    };

    this.toggleHelp = this.toggleHelp.bind(this);
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

  // functions for child pages
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
        }, {}));
    }

    set(items); // return the new items so caller can update state
  }

  loadUserData(game, def, set) {
    if (typeof Storage !== "undefined") {
      if (typeof window.localStorage[game] === "string") {
        let data = JSON.parse(window.localStorage[game]);
        set(
          Object.keys(def).reduce((out, current) => {
            out[current] = def[current];
            // json stores date objects as strings, so have to convert back
            out[current].completion = {
              done: data[current] ? data[current].done : false,
              datetime: data[current] ? new Date(data[current].datetime) : null
            };
            return out;
          }, {})
        );
      }
    }
  }

  // functions for this page
  toggleHelp() {
    let showHelp = this.state.showHelp ? false : true;
    this.setState({ showHelp: showHelp });

    if (typeof Storage !== "undefined") {
      let ui_settings = {};
      if (typeof window.localStorage["ui_settings"] === "string") {
        ui_settings = JSON.parse(window.localStorage["ui_settings"]);
        ui_settings.showHelp = showHelp;
      } else {
        ui_settings = { showHelp: showHelp };
      }

      window.localStorage["ui_settings"] = JSON.stringify(ui_settings);
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <div style={{ height: "100%" }}>
                {this.state.showHelp && (
                  <div className="help">
                    <span>Select a game below to track</span>
                    <Link to="/about" className="link float-right">About</Link>
                    <a className="close float-right" onClick={this.toggleHelp}>
                      &times;
                    </a>
                  </div>
                )}
                {!this.state.showHelp && (
                  <a className="help-hidden" onClick={this.toggleHelp}>
                    &dArr;
                  </a>
                )}

                <div
                  className={
                    this.state.showHelp
                      ? "row expanded medium-unstack help-mob-comp"
                      : "row expanded medium-unstack"
                  }
                  style={{ height: "100%" }}
                >
                  <Link to="/one" className="columns choose one">
                    <div
                      className="row align-middle"
                      style={{ height: "100%" }}
                    >
                      <LogoME1 />
                    </div>
                  </Link>
                  <Link to="/two" className="columns choose two">
                    <div
                      className="row align-middle"
                      style={{ height: "100%" }}
                    >
                      <LogoME2 />
                    </div>
                  </Link>
                  <Link to="/three" className="columns choose three">
                    <div
                      className="row align-middle"
                      style={{ height: "100%" }}
                    >
                      <LogoME3 />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          />
          <Route path="/about" component={About} />
          <Route
            path="/one"
            render={props => (
              <ME1
                {...props}
                handleToggle={this.handleToggle}
                loadUserData={this.loadUserData}
              />
            )}
          />
          <Route
            path="/two"
            render={props => (
              <ME2
                {...props}
                handleToggle={this.handleToggle}
                loadUserData={this.loadUserData}
              />
            )}
          />
          <Route
            path="/three"
            render={props => (
              <ME3
                {...props}
                handleToggle={this.handleToggle}
                loadUserData={this.loadUserData}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
