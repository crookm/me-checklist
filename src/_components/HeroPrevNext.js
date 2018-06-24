import React, { Component } from "react";

class HeroPrevNext extends Component {
  render() {
    return (
      <div className="row collapse align-center align-middle hero">
        {this.props.gameMeta[this.props.game].prev && (
          <div className="columns">
            <h5>Previously...</h5>
            <a
              href={
                this.props.gameMeta[this.props.gameMeta[this.props.game].prev]
                  .link
              }
            >
              <div
                style={{
                  background: `url("${
                    this.props.gameMeta[
                      this.props.gameMeta[this.props.game].prev
                    ].bgimg
                  }")`
                }}
              >
                {React.createElement(
                  this.props.gameMeta[this.props.gameMeta[this.props.game].prev]
                    .logo,
                  {
                    style: {
                      width: "150px",
                      margin: "0 auto",
                      display: "block"
                    }
                  }
                )}
              </div>
            </a>
          </div>
        )}
        {this.props.gameMeta[this.props.game].next && (
          <div className="columns">
            <h5>Up next...</h5>
            <a
              href={
                this.props.gameMeta[this.props.gameMeta[this.props.game].next]
                  .link
              }
            >
              <div
                style={{
                  background: `url("${
                    this.props.gameMeta[
                      this.props.gameMeta[this.props.game].next
                    ].bgimg
                  }")`
                }}
              >
                {React.createElement(
                  this.props.gameMeta[this.props.gameMeta[this.props.game].next]
                    .logo,
                  {
                    style: {
                      width: "150px",
                      margin: "0 auto",
                      display: "block"
                    }
                  }
                )}
              </div>
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default HeroPrevNext;
