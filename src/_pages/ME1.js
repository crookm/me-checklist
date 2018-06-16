import React, { Component } from "react";

import Checklist from "../_components/Checklist";
import LogoME1 from "../_assets/LogoME1";

import ME1List from "../_assets/ME1List";

const GAME = "one";

class ME1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ME1List
    };

    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  componentDidMount() {
    this.props.downstreamHandlers.handleLoadUserData(
      GAME,
      this.state.items,
      updated_items => {
        this.setState({ items: updated_items });
      }
    );

    this.props.downstreamHandlers.handleSetPageTitle("Mass Effect 1");
    this.props.downstreamHandlers.handleTrackPageView();
  }

  toggleCompleted(key) {
    this.props.downstreamHandlers.handleToggle(
      GAME,
      key,
      this.state.items,
      new_items => {
        this.setState({ items: new_items });
      }
    );
  }

  render() {
    return (
      <div className="row align-center">
        <div className="columns medium-6">
          <LogoME1
            style={{
              width: "250px",
              margin: "50px auto 30px",
              display: "block"
            }}
          />
          <Checklist
            game={GAME}
            items={this.state.items}
            onToggle={this.toggleCompleted}
            downstreamHandlers={this.props.downstreamHandlers}
          />
        </div>
      </div>
    );
  }
}

export default ME1;
