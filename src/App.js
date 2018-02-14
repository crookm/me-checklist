import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom';

// error pages
import NotFound from './_pages/_errors/NotFound';

//pages
import ME1 from './_pages/ME1';
import ME2 from './_pages/ME2';
import ME3 from './_pages/ME3';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={GameChooser} />
          <Route path="/one" component={ME1} />
          <Route path="/two" component={ME2} />
          <Route path="/three" component={ME3} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const GameChooser = () => (
  <div className="row expanded medium-unstack" style={ { height: '100%' } }>
    <div className="columns"><Link to="/one">me 1</Link></div>
    <div className="columns"><Link to="/two">me 2</Link></div>
    <div className="columns"><Link to="/three">me 3</Link></div>
  </div>
);

export default App;
