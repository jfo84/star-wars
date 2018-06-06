import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  Redirect
} from 'react-router';

import Person from './components/Person';
import PeopleTable from './components/PeopleTable';
import withSpinner from './components/withSpinner';

class App extends Component {
  render() {
    const { fetching } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/people" />} />
          <Route path="/people" component={withSpinner(PeopleTable, fetching)} />
          <Route path="/people/:id" component={withSpinner(Person, fetching)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.person.fetching || state.people.fetching
  };
};

export default connect(mapStateToProps, null)(App);
