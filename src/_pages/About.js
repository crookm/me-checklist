import React, { Component } from "react";
import { Link } from "react-router-dom";

import LogoME1 from "../_assets/LogoME1";

import "../_styles/About.css";

class About extends Component {
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
              set you up for the next game as best as possible.
            </p>
            <p>
              Note that this website was created well after Andromeda has
              released, but I'm not confident I know how the game works as well
              as the trilogy, so I won't be adding it to this list any time
              soon. I'm not even sure the game isn't linear.
            </p>
            <br />
            <p>
              If you would like to contribute to this website, however, you can
              check out the{" "}
              <Link to="https://github.com/crookm/me-checklist">
                repository
              </Link>. If you'd like to visit me on{" "}
              <Link to="https://www.crookm.com/">my blog</Link>, or follow me on{" "}
              <Link to="https://twitter.com/mattlc_3">Twitter</Link>, I'd
              appreaciate it.
            </p>
            <br />
            <p>
              <Link to="/">&laquo; return to game list</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
