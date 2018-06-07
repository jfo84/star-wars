import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';
import { withRouter } from 'react-router-dom';

import { fetchPerson } from '.././actions';

const PersonTableHead = ({ name }) => (
  <TableHead>
    <TableRow>
      <TableCell>
        {name}
      </TableCell>
    </TableRow>
  </TableHead>
);

let TableContainer = styled.div`
  max-width: 700px;
`;

const WHITELISTED_ATTRS = ['height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
const HEADER_MAP = {
  name: 'Name', 
  height: 'Height',
  mass: 'Mass',
  hair_color: 'Hair Color',
  skin_color: 'Skin Color',
  eye_color: 'Eye Color',
  birth_year: 'Birth Year',
  gender: 'Gender'
};

class Person extends Component {
  componentWillMount() {
    const { fetching, fetchPerson } = this.props;

    // Hack around the lack of ID's by passing the router URL here and the
    // url from the payload in PeopleTable
    // They will both be parsed in the action creator and return the same ID
    if (!fetching) {
      fetchPerson(this.props.history.location.pathname);
    }
  }

  render() {
    const { person } = this.props;

    return(
      <TableContainer>
        <Table>
          <PersonTableHead name={person.name} />
          <TableBody>
            {Object.keys(person).filter(attr => WHITELISTED_ATTRS.includes(attr)).map((attr, index) => {
              const attrValue = person[attr];
              const label = HEADER_MAP[attr];

              return(
                <TableRow
                  tabIndex={-1}
                  key={index}
                  className={'attribute-row' + index}>
                  <TableCell className={'attribute' + index}>{label}</TableCell>
                  <TableCell className={'value' + index}>{attrValue}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    person: state.person.data,
    fetching: state.person.fetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPerson: (url) => { dispatch(fetchPerson(url)) }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Person));