import React, { Component } from "react";
import { Link } from "react-router-dom";

import ControlPanel from "./ControlPanel";
import HeroPrevNext from "./HeroPrevNext";

import "../_styles/Checklist.css";

class Checklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSupplementary:
        typeof this.props.downstreamHandlers.handleGetUI(
          "showSupplementary"
        ) !== "undefined"
          ? this.props.downstreamHandlers.handleGetUI("showSupplementary")
          : true,
      showWikiLinks:
        typeof this.props.downstreamHandlers.handleGetUI("showWikiLinks") !==
        "undefined"
          ? this.props.downstreamHandlers.handleGetUI("showWikiLinks")
          : true,
      showTimelineSuggestions:
        typeof this.props.downstreamHandlers.handleGetUI(
          "showTimelineSuggestions"
        ) !== "undefined"
          ? this.props.downstreamHandlers.handleGetUI("showTimelineSuggestions")
          : true
    };
  }

  toggleCarat(index, e) {
    window.$(`.i-${index}`).toggleClass("active");
    window.$(`.i-${index} .carat`).toggleClass("down");
    window.$(`.i-${index} .info`).slideToggle("fast");
  }

  componentDidMount() {
    window.$(".info").hide();
    window.$(document).foundation();
    window.$(window).trigger("load.zf.sticky");
  }

  handleToggle(key, e) {
    e.stopPropagation();
    this.props.onToggle(key, e);
  }

  render() {
    return (
      <div className="checklist" data-sticky-container>
        <div style={{ height: "70px", display: "block" }}>
          <div
            className="sticky"
            data-sticky
            data-sticky-on="small"
            data-anchor="list-belowmenubar"
            style={{ width: "100%" }}
          >
            <div className="row listmenu datapanel">
              <div className="columns">
                <Link to="/" className="button">
                  &larr; games
                </Link>
              </div>
              <div className="columns shrink">
                <button
                  className="button small"
                  title="Expand all"
                  onClick={e => {
                    window
                      .$(
                        this.state.showSupplementary
                          ? ".info"
                          : ".info:not(.hint)"
                      )
                      .slideDown("fast")
                      .parent()
                      .addClass("active");
                    window.$(".carat").removeClass("down");
                  }}
                >
                  <i className="material-icons">expand_more</i>
                </button>
                <button
                  className="button small"
                  title="Collapse all"
                  onClick={e => {
                    window
                      .$(".info")
                      .slideUp("fast")
                      .parent()
                      .removeClass("active");
                    window.$(".carat").addClass("down");
                  }}
                >
                  <i className="material-icons">expand_less</i>
                </button>
              </div>
              <div className="columns shrink">
                <button
                  className="dropdown button small"
                  data-toggle="checklistSettings"
                >
                  <i className="material-icons">settings</i>
                </button>
                <div
                  className="dropdown-pane"
                  data-position="bottom"
                  data-alignment="right"
                  id="checklistSettings"
                  data-dropdown
                  data-auto-focus="true"
                  data-close-on-click="true"
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.showSupplementary}
                      onChange={e => {
                        this.props.downstreamHandlers.handleSetUI(
                          "showSupplementary",
                          !this.state.showSupplementary
                        );

                        this.setState(prevState => ({
                          showSupplementary: !prevState.showSupplementary
                        }));
                      }}
                    />
                    Hints
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.showWikiLinks}
                      onChange={e => {
                        this.props.downstreamHandlers.handleSetUI(
                          "showWikiLinks",
                          !this.state.showWikiLinks
                        );

                        this.setState(prevState => ({
                          showWikiLinks: !prevState.showWikiLinks
                        }));
                      }}
                    />
                    Wiki links
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={this.state.showTimelineSuggestions}
                      onChange={e => {
                        this.props.downstreamHandlers.handleSetUI(
                          "showTimelineSuggestions",
                          !this.state.showTimelineSuggestions
                        );

                        this.setState(prevState => ({
                          showTimelineSuggestions: !prevState.showTimelineSuggestions
                        }));
                      }}
                    />
                    Timeline suggestions
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="list-belowmenubar">
          <ControlPanel
            api={this.props.api}
            game={this.props.game}
            items={this.props.items}
            syncAvailable={false}
            downstreamHandlers={this.props.downstreamHandlers}
            syncActive={this.props.syncActive}
            syncLast={this.props.syncLast}
          />

          <div id="list-actual">
            {Object.entries(this.props.items).map(([key, entry]) => (
              <div key={key} className={`item i-${key}`}>
                {entry["wiki"] ? (
                  <div
                    className={
                      /<[a-z][\s\S]*>/i.test(entry.title)
                        ? "row head milestone"
                        : "row head"
                    }
                    onClick={e => this.toggleCarat(key, e)}
                  >
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
                    <div className="columns titlerow">
                      <div className="row">
                        <div className="columns title">
                          <p
                            dangerouslySetInnerHTML={{ __html: entry.title }}
                          />
                        </div>
                        {this.state.showWikiLinks && (
                          <div className="columns shrink">
                            <p>
                              <i
                                className="material-icons"
                                style={{ margin: "9px 0 10px" }}
                              >
                                <a
                                  href={entry.wiki}
                                  target="_BLANK"
                                  rel="noopener noreferrer"
                                  title="View on the Mass Effect Wiki"
                                  style={{
                                    color: "#d505ff"
                                  }}
                                >
                                  launch
                                </a>
                              </i>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="columns shrink">
                      <div className="carat up down" />
                    </div>
                  </div>
                ) : (
                  this.state.showSupplementary && (
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
                        <label
                          className="checktainer"
                          style={{ cursor: "unset" }}
                        />
                      </div>
                      <div className="columns title">
                        <p style={{ color: "#f0f0f0" }}>{entry.title}</p>
                      </div>
                      <div className="columns shrink">
                        <div className="carat down up" />
                      </div>
                    </div>
                  )
                )}

                <div className={`row info ${entry["wiki"] ? "" : "hint"}`}>
                  <div className="columns small-12">
                    <h3 dangerouslySetInnerHTML={{ __html: entry.title }} />
                    <p dangerouslySetInnerHTML={{ __html: entry.desc }} />

                    {this.state.showTimelineSuggestions && (
                      <div className="row timeline">
                        <div className="columns medium-6">
                          <h4>Complete after</h4>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: entry.timeline.after
                            }}
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
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="item">
              <HeroPrevNext
                game={this.props.game}
                gameMeta={this.props.gameMeta}
              />
            </div>
          </div>
        </div>
        <p style={{ margin: "1rem 0" }}>
          <Link to="/">&larr; return to game list</Link>
        </p>
      </div>
    );
  }
}

export default Checklist;
