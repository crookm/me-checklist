import React, { Component } from "react";
import LoadingOverlay from "./LoadingOverlay";

class SyncPanel extends Component {
  constructor(props) {
    super(props);

    this.apiBase = "https://me-checklist-api.azurewebsites.net/api";
    this.apiCodes = {
      writeMerge: "0HCZD/leGgCc6kXNwljTgKAJqLvRdaZXSFaSk13FBDCEC0NaskNY8g=="
    };

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
          : "never",
      syncActive: false
    };

    this.setLink = this.setLink.bind(this);
    this.doSync = this.doSync.bind(this);
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
      this.setState({ syncLink: null });
      this.props.downstreamHandlers.handleSetUI("syncLink", null);
    } else {
      if (input.length < 6) {
        this.refs["sync-passphrase_input-error"].innerHTML =
          "Passphrases must be > 10 characters. We recommend a short sentence of a few random words.";
      } else {
        this.setState({ syncLink: input }, this.doSync);
        this.props.downstreamHandlers.handleSetUI("syncLink", input);
        this.refs["sync-passphrase_input-error"].innerHTML = "";
      }
    }
  }

  doSync() {
    if (typeof Storage !== "undefined") {
      this.setState({ syncActive: true });

      window.$.ajax({
        url: `${this.apiBase}/write/merge/${this.props.game}/${
          this.state.syncLink
        }?code=${this.apiCodes["writeMerge"]}`,
        type: "POST",
        contentType: "application/json",

        data: window.localStorage[this.props.game] || "{}",
        dataType: "json",

        success: data => {
          this.props.downstreamHandlers.handleSyncResponse(data, this.props.items);

          this.setState({ syncActive: false, syncLast: new Date() });
          this.props.downstreamHandlers.handleSetUI("syncLast", new Date());
        },
        error: err => {
          console.error("Failed to sync checkdata:");
          console.error(err);

          this.setState({ syncActive: false });
        }
      });
    }
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
              <b>Sync passphrase</b>: ****{this.state.syncLink.slice(-4)}
              <br />
              <b>Last sync</b>:{" "}
              {typeof this.state.syncLast === "string"
                ? this.state.syncLast
                : this.timeSince(this.state.syncLast) === "0 seconds"
                  ? "just now"
                  : `${this.timeSince(this.state.syncLast)} ago`}
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
              <button className="button small" onClick={e => this.doSync()}>
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
