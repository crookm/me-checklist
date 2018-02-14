import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom';

import './_styles/GameChooser.css';

// error pages
import NotFound from './_pages/_errors/NotFound';

// pages
import ME1 from './_pages/ME1';
import ME2 from './_pages/ME2';
import ME3 from './_pages/ME3';

// assets
import LogoME1 from './_assets/LogoME1';
import LogoME2 from './_assets/LogoME2';
import LogoME3 from './_assets/LogoME3';

class App extends Component {
  handleToggle(game, key, items, set) {
    let toggled = {
      done: items[key].completion.done ? false : true,
      datetime: new Date()
    };

    items[key].completion = toggled;

    if (typeof(Storage) !== 'undefined'){
      window.localStorage[game] = JSON.stringify(items.map(i => i.completion));
    }

    set(items); // return the new items so caller can update state
  }

  loadUserData(game, def, set) {
    if (typeof(Storage) !== 'undefined'){
      if (typeof(window.localStorage[game]) === 'string') {
        let data = JSON.parse(window.localStorage[game]);
        set(def.map((item, i) => {
          item.completion = data[i];
          item.completion.datetime = new Date(item.completion.datetime);
          return item;
        }));
      }
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={GameChooser} />
          <Route path="/one" render={props => <ME1 {...props} handleToggle={this.handleToggle} loadUserData={this.loadUserData} />} />
          <Route path="/two" render={props => <ME2 {...props} handleToggle={this.handleToggle} loadUserData={this.loadUserData} />} />
          <Route path="/three" render={props => <ME3 {...props} handleToggle={this.handleToggle} loadUserData={this.loadUserData} />} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const GameChooser = () => (
  <div className="row expanded medium-unstack" style={ { height: '100%' } }>
    <Link to="/one" className="columns choose one">
      <div className="row align-middle" style={ { height: '100%' } }>
        <LogoME1 />
      </div>
    </Link>
    <Link to="/two" className="columns choose two">
      <div className="row align-middle" style={ { height: '100%' } }>
        <LogoME2 />
      </div>
    </Link>
    <Link to="/three" className="columns choose three">
      <div className="row align-middle" style={ { height: '100%' } }>
        <LogoME3 />
      </div>
    </Link>
  </div>
);

export default App;
