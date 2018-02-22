import React, { Component } from "react";

import Checklist from "../_components/Checklist";
import LogoME2 from "../_assets/LogoME2";

import ME2List from "../_assets/ME2List";

const GAME = "two";

class ME2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ME2List
    };
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  componentDidMount() {
    this.props.loadUserData(GAME, this.state.items, updated_items => {
      this.setState({ items: updated_items });
    });
  }

  toggleCompleted(key) {
    this.props.handleToggle(GAME, key, this.state.items, new_items => {
      this.setState({ items: new_items });
    });
  }

  render() {
    return (
      <div className="row align-center">
        <div className="columns medium-6">
          <LogoME2
            style={{ width: "250px", margin: "50px auto", display: "block" }}
          />
          <Checklist items={this.state.items} onToggle={this.toggleCompleted} />
        </div>
      </div>
    );
  }
}

export default ME2;
