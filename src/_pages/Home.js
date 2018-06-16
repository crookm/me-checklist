import React, { Component } from "react";
import { Link } from "react-router-dom";

// assets
import LogoME1 from "../_assets/LogoME1";
import LogoME2 from "../_assets/LogoME2";
import LogoME3 from "../_assets/LogoME3";

// styles
import "../_styles/GameChooser.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: true
    };

    this.props.downstreamHandlers.handleSetPageTitle("Game selector");
  }

  toggleHelp() {
    this.setState(prevState => ({ showHelp: !prevState.showHelp }));

    if (typeof Storage !== "undefined") {
      let ui_settings = {};
      if (typeof window.localStorage["ui_settings"] === "string") {
        ui_settings = JSON.parse(window.localStorage["ui_settings"]);
        ui_settings.showHelp = this.state.showHelp;
      } else {
        ui_settings = { showHelp: this.state.showHelp };
      }

      window.localStorage["ui_settings"] = JSON.stringify(ui_settings);

      window.appInsights.trackEvent("toggleHelp", {
        state: ui_settings.showHelp,
        dev: this.props.isLocal
      });
    }
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        {this.state.showHelp && (
          <div className="help">
            <span>Select a game below to track</span>
            <Link to="/about" className="link float-right">
              About
            </Link>
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
            <div className="row align-middle" style={{ height: "100%" }}>
              <LogoME1 />
            </div>
          </Link>
          <Link to="/two" className="columns choose two">
            <div className="row align-middle" style={{ height: "100%" }}>
              <LogoME2 />
            </div>
          </Link>
          <Link to="/three" className="columns choose three">
            <div className="row align-middle" style={{ height: "100%" }}>
              <LogoME3 />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
