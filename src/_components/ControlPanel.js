import React, { Component } from "react";

import SyncPanel from "./SyncPanel";
import AnalyserPanel from "./AnalyserPanel";

class GameDataPanel extends Component {
  render() {
    if (this.props.syncAvailable || this.props.analyserAvailable) {
      return (
        <div className="row datapanel">
          {this.props.syncAvailable && (
            <SyncPanel
              api={this.props.api}
              game={this.props.game}
              items={this.props.items}
              downstreamHandlers={this.props.downstreamHandlers}
              syncActive={this.props.syncActive}
              syncLast={this.props.syncLast}
            />
          )}
          {this.props.analyserAvailable && (
            <AnalyserPanel
              game={this.props.game}
              downstreamHandlers={this.props.downstreamHandlers}
            />
          )}
        </div>
      );
    } else return null;
  }
}

export default GameDataPanel;
