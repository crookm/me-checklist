import React, { Component } from "react";

import Checklist from "../_components/Checklist";
import LogoME1 from "../_assets/LogoME1";

const GAME = "one";

class ME1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: "something",
          desc: "a longer description of what you need to do",
          timeline: {
            before: "do before this event",
            after: "do after this even"
          },
          completion: {
            done: false,
            datetime: null
          }
        },
        {
          title: "something 2 rellly long sdjkf kjsh dkjahdkfjhs",
          desc: "a longer description of what you need to do",
          timeline: {
            before: "do before this event",
            after: "do after this even"
          },
          completion: {
            done: false,
            datetime: null
          }
        }
      ]
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
          <LogoME1
            style={{ width: "250px", margin: "50px auto", display: "block" }}
          />
          <Checklist items={this.state.items} onToggle={this.toggleCompleted} />
        </div>
      </div>
    );
  }
}

export default ME1;
