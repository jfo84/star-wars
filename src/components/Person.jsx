import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';
import { withRouter, Redirect } from 'react-router-dom';

import { fetchPerson, removePerson } from '.././actions';

const PersonTableHead = ({ name }) => (
  <TableHead>
    <TableRow>
      <TableCell>
        {name}
      </TableCell>
      <TableCell>
      </TableCell>
    </TableRow>
  </TableHead>
);

const BackButton = styled(Button)`
  && {
    margin: 15px 15px 5px 15px;
  }
`;

const PersonContainer = styled.div`
`;

const TableContainer = styled.div`
  margin: 10px;
  max-width: 700px;
  border: 1px solid black;
  border-radius: 5px;
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
    const { person, personId, removePerson } = this.props;

    if (!personId) {
      return <Redirect to="/people" />;
    }

    return(
      <PersonContainer>
        <BackButton
          variant='raised'
          onClick={event => removePerson()}
          className='back-button'
        >
          Back to People
        </BackButton>
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
      </PersonContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    person: state.person.data,
    personId: state.person.id,
    fetching: state.person.fetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPerson: (url) => { dispatch(fetchPerson(url)) },
    removePerson: () => { dispatch(removePerson()) }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Person));