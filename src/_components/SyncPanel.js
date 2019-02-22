import React, { Component } from "react";

import LoadingOverlay from "./LoadingOverlay";

class SyncPanel extends Component {
  constructor(props) {
    super(props);

    this.api = this.props.api;

    this.state = {
      syncLink:
        typeof this.props.downstreamHandlers.handleGetUI("syncLink") !==
        "undefined"
          ? this.props.downstreamHandlers.handleGetUI("syncLink")
          : null,
      syncAuto:
        typeof this.props.downstreamHandlers.handleGetUI("syncAuto") !==
        "undefined"
          ? this.props.downstreamHandlers.handleGetUI("syncAuto")
          : true,
      syncAutoToggle:
        typeof this.props.downstreamHandlers.handleGetUI("syncAutoToggle") !==
        "undefined"
          ? this.props.downstreamHandlers.handleGetUI("syncAutoToggle")
          : true,
      syncLast:
        typeof this.props.downstreamHandlers.handleGetUI("syncLast") !==
        "undefined"
          ? new Date(this.props.downstreamHandlers.handleGetUI("syncLast"))
          : null,
      syncAgo: null,
      syncActive: false
    };

    if (
      typeof this.props.downstreamHandlers.handleGetUI("syncAuto") ===
      "undefined"
    ) {
      this.props.downstreamHandlers.handleSetUI("syncAuto", true);
    }

    if (
      typeof this.props.downstreamHandlers.handleGetUI("syncAutoToggle") ===
      "undefined"
    ) {
      this.props.downstreamHandlers.handleSetUI("syncAutoToggle", true);
    }

    this.timerBGSync = setInterval(() => {
      if (this.state.syncAuto && this.state.syncLink) this.doSync(false, false);
    }, 1000 * 60 * 1);

    this.timerLastSync = setInterval(
      () => this.tick(this.state.syncLast),
      1000 * 1
    );

    this.setLink = this.setLink.bind(this);
    this.doSync = this.doSync.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    this.tick(this.state.syncLast); // initial tick, so it's not empty on load
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      syncActive: nextProps.syncActive,
      syncLast: nextProps.syncLast
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerBGSync);
    clearInterval(this.timerLastSync);
    this.api.closeAll();
  }

  timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  setLink(input) {
    if (input === null) {
      this.setState({ syncLink: null, syncLast: null });
      this.props.downstreamHandlers.handleSetUI("syncLink", null);
      this.props.downstreamHandlers.handleSetUI("syncLast", null);
    } else {
      if (input.length < 6) {
        this.refs["sync-passphrase_input-error"].innerHTML =
          "Passphrases must be > 10 characters. We recommend a short sentence of a few random words.";
      } else {
        this.setState({ syncLink: input }, () => this.doSync(true, true));
        this.props.downstreamHandlers.handleSetUI("syncLink", input);
        this.refs["sync-passphrase_input-error"].innerHTML = "";
      }
    }
  }

  doSync(bypassDebounce, interacted) {
    if (typeof Storage !== "undefined") {
      this.setState({ syncActive: true });

      let endpoint = bypassDebounce
        ? this.api._writeMerge
        : this.api.writeMerge;

      // bypass the debounce this time
      endpoint(
        this.state.syncLink,
        window.localStorage[this.props.game],
        data => {
          // success from http
          this.props.downstreamHandlers.handleSyncResponse(
            data,
            this.props.items,
            interacted
          );

          this.setState({ syncActive: false, syncLast: new Date() });
          this.props.downstreamHandlers.handleSetUI("syncLast", new Date());
          this.tick(this.state.syncLast);
        },
        err => {
          // error from http
          console.error("Failed to sync checkdata:");
          console.error(err);

          this.setState({ syncActive: false });
        }
      );
    }
  }

  tick(lastSync) {
    this.setState({
      syncAgo:
        lastSync === null
          ? "never"
          : this.timeSince(lastSync) === "0 seconds"
            ? "just now"
            : `${this.timeSince(lastSync)} ago`
    });
  }

  render() {
    return (
      <div className="columns">
        <h5>
          Sync{" "}
          <span
            data-tooltip
            title="Sync your checklist to the cloud! Your current progress will be merged with what we have stored using this passphrase."
          >
            <i className="material-icons" style={{ fontSize: "1rem" }}>
              help
            </i>
          </span>
        </h5>
        {this.state.syncLink ? (
          <div>
            <p>
              <b>Sync passphrase</b>: ****{this.state.syncLink.slice(-4)}
              <br />
              <b>Last sync</b>: {this.state.syncAgo}
            </p>
            <label>
              <input
                type="checkbox"
                checked={this.state.syncAuto}
                onChange={e => {
                  this.props.downstreamHandlers.handleSetUI(
                    "syncAuto",
                    !this.state.syncAuto
                  );

                  this.setState(prevState => ({
                    syncAuto: !prevState.syncAuto
                  }));
                }}
              />
              Auto-sync in background
            </label>
            <label style={{ marginBottom: "10px" }}>
              <input
                type="checkbox"
                checked={this.state.syncAutoToggle}
                onChange={e => {
                  this.props.downstreamHandlers.handleSetUI(
                    "syncAutoToggle",
                    !this.state.syncAutoToggle
                  );

                  this.setState(prevState => ({
                    syncAutoToggle: !prevState.syncAutoToggle
                  }));
                }}
              />
              Auto-sync on toggle item
            </label>

            <div className="button-group small">
              <button
                className="button small"
                onClick={e => this.doSync(false)}
              >
                Sync now
              </button>
              <button
                className="button small secondary"
                onClick={e => this.setLink(null)}
              >
                Unlink
              </button>
            </div>

            {this.state.syncActive && <LoadingOverlay />}
          </div>
        ) : (
          <div>
            <div className="input-group">
              <input
                className="input-group-field"
                type="password"
                placeholder="Passphrase"
                ref="sync-passphrase"
              />
              <div className="input-group-button">
                <button
                  className="button"
                  onClick={e =>
                    this.setLink(this.refs["sync-passphrase"].value)
                  }
                >
                  Go
                </button>
              </div>
            </div>
            <p ref="sync-passphrase_input-error" />
          </div>
        )}
      </div>
    );
  }
}

export default SyncPanel;
