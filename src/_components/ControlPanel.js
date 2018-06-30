import React, { Component } from "react";

import SyncPanel from "./SyncPanel";
import AnalyserPanel from "./AnalyserPanel";

class GameDataPanel extends Component {
  render() {
    return (
      <div className="row datapanel">
        {this.props.syncAvailable && (
          <SyncPanel downstreamHandlers={this.props.downstreamHandlers} />
        )}
        {this.props.analyserAvailable && (
          <AnalyserPanel downstreamHandlers={this.props.downstreamHandlers} />
        )}
      </div>
    );
  }
}

export default GameDataPanel;
