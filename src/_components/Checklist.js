import React, { Component } from 'react';

class Checklist extends Component {
  render() {
    return (
      <div>
        <ul>
          { this.props.items.map((item, index) => (
            <li key={index}>{item.title} - {item.completion.done ? 'completed' : 'not completed'} - <a onClick={(e) => this.props.onToggle(index, e)}>toggle</a></li>
          )) }
        </ul>
      </div>
    );
  }
}

export default Checklist;
