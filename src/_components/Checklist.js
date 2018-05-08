import React, { Component } from "react";
import "../_styles/Checklist.css";

class Checklist extends Component {
  toggleCarat(index) {
    window.$(`.i-${index}`).toggleClass("active");
    window.$(`.i-${index} .carat`).toggleClass("down");
    window.$(`.i-${index} .info`).slideToggle("fast");
  }

  componentDidMount() {
    window.$(".info").hide();
  }

  render() {
    return (
      <div className="checklist">
        {Object.entries(this.props.items).map(
          ([key, entry]) => (
            <div key={key} className={`item i-${key}`}>
              <div className="row head">
                <div className="columns shrink">
                  <label className="checktainer">
                    <input
                      type="checkbox"
                      onChange={e => this.props.onToggle(key, e)}
                      checked={entry.completion.done ? true : false}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="columns title">
                  <p>
                    <a onClick={e => this.props.onToggle(key, e)}>
                      {entry.title}
                    </a>
                  </p>
                </div>
                <div className="columns shrink">
                  <a onClick={e => this.toggleCarat(key, e)}>
                    <div className="carat down up" />
                  </a>
                </div>
              </div>
              <div className="row info">
                <div className="columns small-12">
                  <h3>{entry.title}</h3>
                  <p>{entry.desc}</p>

                  <div className="row timeline">
                    <div className="columns medium-6">
                      <h4>Complete after</h4>
                      <p>{entry.timeline.after}</p>
                    </div>
                    <div className="columns medium-6">
                      <h4>Complete before</h4>
                      <p>{entry.timeline.before}</p>
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
