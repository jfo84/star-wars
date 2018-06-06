import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Person from './components/Person';
import PeopleTable from './components/PeopleTable';
import withSpinner from './components/withSpinner';

class App extends Component {
  render() {
    const { fetching } = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/people" />} />
          <Route path="/people" component={withSpinner(PeopleTable, fetching)} />
          <Route path="/people/:id" component={withSpinner(Person, fetching)} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.fetchingPerson || state.fetchingPeople
  };
};

export default connect(mapStateToProps, null)(App);
