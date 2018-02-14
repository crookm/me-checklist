import React, { Component } from 'react';

import Checklist from '../_components/Checklist';

class ME1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: 'something',
          desc: 'a longer description of what you need to do',
          timeline: {
            before: 'do before this event',
            after: 'do after this even'
          },
          completion: {
            done: false,
            datetime: null
          }
        },
        {
          title: 'something 2',
          desc: 'a longer description of what you need to do',
          timeline: {
            before: 'do before this event',
            after: 'do after this even'
          },
          completion: {
            done: false,
            datetime: null
          }
        }
      ]
    };
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  toggleCompleted(key) {
    this.props.handleToggle('one', key, this.state.items, new_items => {
      this.setState({ items: new_items })
    });
  }

  render() {
    return <Checklist items={this.state.items} onToggle={this.toggleCompleted} />;
  }
}

export default ME1;
