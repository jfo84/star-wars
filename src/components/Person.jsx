import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from 'material-ui/Table';

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
`;

class Person extends Component {
  render() {
    const { person } = this.props;

    return(
      <TableContainer>
        <Table>
          <PersonTableHead name={person.name} />
          <TableBody>
            {Object.keys(person).map((attr, index) => (
              <TableRow
              hover
              tabIndex={-1}
              key={index}
              className={'attribute-row' + index}
            >
              <TableCell className={'attribute' + index}>{attr}</TableCell>
              <TableCell className={'value' + index}>{person[attr]}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    person: state.person.data,
  };
};

export default connect(mapStateToProps, null)(Person);