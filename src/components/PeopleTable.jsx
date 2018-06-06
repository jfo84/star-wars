import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Table, {
  TableBody,
  TableCell,
  TableRow,
  TablePagination
} from 'material-ui/Table';

import { fetchPerson, fetchPeople, changePage } from '.././actions';
import PeopleTableHead from './PeopleTableHead';

let TableContainer = styled.div`
`;

class PeopleTable extends Component {
  componentWillMount() {
    this.props.fetchPeople();
  }

  handleChangePage = (event, page) => {
    const internalPage = page + 1;

    this.props.changePage(internalPage);
  };

  handleClick = (event, url) => {
    this.props.fetchPerson(url);
  };

  render() {
    const { personId, people, peopleCount, page } = this.props;

    const zeroIndexPage = page - 1;

    // Redirect if we have a person detail page ID
    // Just nil it out when we navigate to People again
    // With two routes this is fine, but obviously it will become cumbersome
    if (personId) {
      this.props.history.push(`/person/${personId}`);
    }

    return(
      <TableContainer>
        <Table>
          <PeopleTableHead />
          <TableBody>
            {people.map((person, index) => (
              <TableRow
                hover
                onClick={event => this.handleClick(event, person.url)}
                tabIndex={-1}
                key={index}
                className={'person-row' + index}
              >
                <TableCell className={'name' + index}>{person.name}</TableCell>
                <TableCell className={'height' + index}>{person.height}</TableCell>
                <TableCell className={'hair-color' + index}>{person.hair_color}</TableCell>
                <TableCell className={'skin-color' + index}>{person.skin_color}</TableCell>
                <TableCell className={'eye-color' + index}>{person.eye_color}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={peopleCount}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
          page={zeroIndexPage}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          onChangePage={this.handleChangePage}
        />
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    personId: state.personId,
    people: state.people,
    peopleCount: state.peopleCount,
    page: state.page
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPerson: (url) => { dispatch(fetchPerson(url)) },
    fetchPeople: () => { dispatch(fetchPeople()) },
    changePage: (page) => { dispatch(changePage(page)) }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PeopleTable));