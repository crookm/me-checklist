import React, { Component } from "react";

import Timeline from "../_components/Timeline";
import Checklist from "../_components/Checklist";

import LogoME1 from "../_assets/LogoME1";
import LogoME2 from "../_assets/LogoME2";
import LogoME3 from "../_assets/LogoME3";

import ME1List from "../_assets/ME1List";
import ME2List from "../_assets/ME2List";
import ME3List from "../_assets/ME3List";

import "../_styles/Game.css";

class Game extends Component {
  constructor(props) {
    super(props);

    this.gameMeta = {
      1: {
        items: ME1List,
        logo: LogoME1,
        link: "/one",
        title: "Mass Effect 1",
        bgimg: "/assets/img/game-bg-1.jpg",
        prev: null,
        next: 2
      },
      2: {
        items: ME2List,
        logo: LogoME2,
        link: "/two",
        title: "Mass Effect 2",
        bgimg: "/assets/img/game-bg-2.jpg",
        prev: 1,
        next: 3
      },
      3: {
        items: ME3List,
        logo: LogoME3,
        link: "/three",
        title: "Mass Effect 3",
        bgimg: "/assets/img/game-bg-3.jpg",
        prev: 2,
        next: null
      }
    };

    this.state = this.gameMeta[this.props.game];

    this.tlItems = Object.entries(this.state.items).reduce(
      (accumulator, [currentKey, currentItem]) => {
        if (/<[a-z][\s\S]*>/i.test(currentItem.title)) {
          accumulator.push(currentItem.title.match(/<[a-z][\s\S]*>/i)[0]);
        }
        return accumulator;
      },
      []
    );

    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  componentDidMount() {
    this.props.downstreamHandlers.handleLoadUserData(
      this.props.game,
      this.state.items,
      updated_items => {
        this.setState({ items: updated_items });
      }
    );

    this.props.downstreamHandlers.handleSetPageTitle(this.state.title);
    this.props.downstreamHandlers.handleTrackPageView();
  }

  toggleCompleted(key) {
    this.props.downstreamHandlers.handleToggle(
      this.props.game,
      key,
      this.state.items,
      new_items => {
        this.setState({ items: new_items });
      }
    );
  }

  render() {
    return (
      <div>
        <div
          className="gcl background"
          style={{ background: `url("${this.state.bgimg}")` }}
        >
          {" "}
        </div>
        <div className="row align-center gcl content">
          <div className="columns medium-7 small-12">
            {React.createElement(this.state.logo, {
              style: {
                width: "250px",
                margin: "50px auto",
                display: "block"
              }
            })}
            <div className="row">
              <div className="columns shrink show-for-medium">
                <Timeline items={this.tlItems} />
              </div>
              <div className="columns">
                <Checklist
                  game={this.props.game}
                  gameMeta={this.gameMeta}
                  items={this.state.items}
                  onToggle={this.toggleCompleted}
                  downstreamHandlers={this.props.downstreamHandlers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
