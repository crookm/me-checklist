import React, { Component } from "react";

import SyncPanel from "./SyncPanel";
import AnalyserPanel from "./AnalyserPanel";

class GameDataPanel extends Component {
  render() {
    return (
      <div className="row datapanel">
        {this.props.syncAvailable && (
          <SyncPanel game={this.props.game} items={this.props.items} downstreamHandlers={this.props.downstreamHandlers} />
        )}
        {this.props.analyserAvailable && (
          <AnalyserPanel game={this.props.game} downstreamHandlers={this.props.downstreamHandlers} />
        )}
      </div>
    );
  }
}

export default GameDataPanel;
