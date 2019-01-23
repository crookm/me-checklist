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
      showHelp: typeof this.props.downstreamHandlers.handleGetUI("showHelp") !==
        "undefined"
          ? this.props.downstreamHandlers.handleGetUI("showHelp")
          : true
    };

    this.toggleHelp = this.toggleHelp.bind(this);

    this.props.downstreamHandlers.handleSetPageTitle("Game selector");
  }

  toggleHelp() {
    this.props.downstreamHandlers.handleSetUI("showHelp", !this.state.showHelp);
    this.setState(prevState => ({ showHelp: !prevState.showHelp }));
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
            <p className="close float-right" onClick={this.toggleHelp}>
              &times;
            </p>
          </div>
        )}
        {!this.state.showHelp && (
          <p className="help-hidden" onClick={this.toggleHelp}>
            &dArr;
          </p>
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
