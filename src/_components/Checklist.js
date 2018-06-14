import React, { Component } from "react";
import "../_styles/Checklist.css";

class Checklist extends Component {
  toggleCarat(index, e) {
    window.$(`.i-${index}`).toggleClass("active");
    window.$(`.i-${index} .carat`).toggleClass("down");
    window.$(`.i-${index} .info`).slideToggle("fast");
  }

  componentDidMount() {
    window.$(".info").hide();
  }

  handleToggle(key, e) {
    e.stopPropagation();
    this.props.onToggle(key, e);
  }

  render() {
    return (
      <div className="checklist">
        {Object.entries(this.props.items).map(([key, entry]) => (
          <div key={key} className={`item i-${key}`}>
            {entry["wiki"] ? (
              <div className="row head" onClick={e => this.toggleCarat(key, e)}>
                <div className="columns shrink">
                  <label
                    className="checktainer"
                    onClick={e => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      onChange={e => this.handleToggle(key, e)}
                      checked={entry.completion.done ? true : false}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="columns title">
                  <p>
                    <a dangerouslySetInnerHTML={{ __html: entry.title }} />
                  </p>
                </div>
                <div className="columns shrink">
                  <a>
                    <div className="carat down up" />
                  </a>
                </div>
              </div>
            ) : (
              // no wiki entry, so it's a hint
              <div
                className="row head"
                style={{
                  padding: "0 10px",
                  background: "#5f5f5f",
                  borderBottom: "1px solid #444242"
                }}
                onClick={e => this.toggleCarat(key, e)}
              >
                <div className="columns shrink">
                  <label className="checktainer" />
                </div>
                <div className="columns title">
                  <p>
                    <a style={{ color: "#f0f0f0" }}>{entry.title}</a>
                  </p>
                </div>
                <div className="columns shrink">
                  <a>
                    <div className="carat down up" />
                  </a>
                </div>
              </div>
            )}

            <div className="row info">
              <div className="columns small-12">
                <h3 dangerouslySetInnerHTML={{ __html: entry.title }} />
                <p dangerouslySetInnerHTML={{ __html: entry.desc }} />

                <div className="row timeline">
                  <div className="columns medium-6">
                    <h4>Complete after</h4>
                    <p
                      dangerouslySetInnerHTML={{ __html: entry.timeline.after }}
                    />
                  </div>
                  <div className="columns medium-6">
                    <h4>Complete before</h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: entry.timeline.before
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Checklist;
