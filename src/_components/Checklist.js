import React, { Component } from "react";
import "../_styles/Checklist.css";

class Checklist extends Component {
  render() {
    return (
      <div className="checklist">
        {this.props.items.map((item, index) => (
          <div key={index} className={`item i-${index}`}>
            <div className="row head">
              <div className="columns shrink">
                <label className="checktainer">
                  <input
                    type="checkbox"
                    onChange={e => this.props.onToggle(index, e)}
                    checked={item.completion.done ? true : false}
                  />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="columns title"><p>{item.title}</p></div>
              <div className="columns shrink">
                <div className="carat-down" />
              </div>
            </div>
            <div className="row info">
              the stuff
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Checklist;
