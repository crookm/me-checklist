import React, { Component } from "react";

import Loader from "../_assets/Loader";

import "../_styles/Loader.css";

class LoadingOverlay extends Component {
  render() {
    return (
      <div className="loading-overlay">
        <Loader className="loader" />
      </div>
    );
  }
}

export default LoadingOverlay;
