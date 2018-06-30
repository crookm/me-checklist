import React, { Component } from "react";

class SyncPanel extends Component {
  constructor(props) {
    super(props);

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
      syncLast:
        typeof this.props.downstreamHandlers.handleGetUI("syncLast") !==
        "undefined"
          ? new Date(this.props.downstreamHandlers.handleGetUI("syncLast"))
          : "never"
    };

    this.setLink = this.setLink.bind(this);
  }

  setLink(input) {
    if (input === null) {
      this.setState({ syncLink: null });
      this.props.downstreamHandlers.handleSetUI("syncLink", null);
    } else {
      if (input.length < 6) {
        this.refs["sync-passphrase_input-error"].innerHTML =
          "Passphrases must be > 10 characters. We recommend a short sentence of a few random words.";
      } else {
        this.setState({ syncLink: input });
        this.props.downstreamHandlers.handleSetUI("syncLink", input);
        this.refs["sync-passphrase_input-error"].innerHTML = "";
      }
    }
  }

  doSync() {
    //
  }

  render() {
    return (
      <div className="columns">
        <h5>
          Sync{" "}
          <span
            data-tooltip
            title="Sync your checklist to the cloud! Your current data will be merged with what we have stored using this password."
          >
            <i className="material-icons" style={{ fontSize: "1rem" }}>
              help
            </i>
          </span>
        </h5>
        {this.state.syncLink ? (
          <div>
            <p>
              <b>Sync phrase</b>: ******{this.state.syncLink.slice(-4)}
              <br />
              <b>Last sync</b>: {this.state.syncLast}
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
              Auto-sync
            </label>

            <div className="button-group small">
              <button className="button small">Sync now</button>
              <button
                className="button small secondary"
                onClick={e => this.setLink(null)}
              >
                Unlink
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="input-group">
              <input
                className="input-group-field"
                type="text"
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
