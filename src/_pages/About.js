import React, { Component } from "react";
import { Link } from "react-router-dom";

import LogoME1 from "../_assets/LogoME1";

import "../_styles/About.css";

class About extends Component {
  componentDidMount() {
    this.props.downstreamHandlers.handleSetPageTitle("About");
    this.props.downstreamHandlers.handleTrackPageView();
  }

  render() {
    return (
      <div className="row align-center">
        <div className="columns medium-6">
          <LogoME1
            style={{
              width: "250px",
              margin: "50px auto 5px",
              display: "block"
            }}
          />
          <h1>Checklist</h1>
          <div className="content">
            <p>
              The Mass Effect Checklist is a service I created to make it easier
              for me to remember what I needed to do in each game, for a perfect
              ending every time.
            </p>
            <p>
              The checklist items I have curated for each game are selected to
              reveal the most lore, lead to a perfect ending for each game, and
              set you up for the next game.
            </p>
            <p>
              Note that this website was created well after Andromeda was
              released, but I'm not confident I know how the game works so I
              won't be adding it to this list any time
              soon. I'm not even sure the game isn't linear.
            </p>
            <br />
            <p>
              If you would like to contribute to this website, however, you can
              check out the{" "}
              <a
                href="https://github.com/crookm/me-checklist"
                onClick={e =>
                  this.props.downstreamHandlers.handleTrackOutboundLink(e, "Navigation", "Link click on About page", "Repository")
                }
              >
                repository
              </a>. If you'd like to visit me on{" "}
              <a
                href="https://www.crookm.com/"
                onClick={e =>
                  this.props.downstreamHandlers.handleTrackOutboundLink(e, "Navigation", "Link click on About page", "Blog")
                }
              >
                my blog
              </a>, or follow me on{" "}
              <a
                href="https://twitter.com/mattlc_3"
                onClick={e =>
                  this.props.downstreamHandlers.handleTrackOutboundLink(e, "Navigation", "Link click on About page", "Twitter")
                }
              >
                Twitter
              </a>, I'd appreaciate it.
            </p>
            <br />
            <p>
              <Link to="/">&#x2190; return to game list</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
