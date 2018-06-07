import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Person from './components/Person';
import PeopleTable from './components/PeopleTable';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/people" />} />
      <Route path="/people" component={PeopleTable} />
      <Route path="/person/:id" component={Person} />
    </Switch>
  </Router>
);

export default App;
