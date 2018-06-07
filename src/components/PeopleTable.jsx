import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Table, {
  TableBody,
  TableCell,
  TableRow,
  TablePagination
} from 'material-ui/Table';

import { fetchPerson, fetchPeople, changePage } from '.././actions';

import PeopleTableHead from './PeopleTableHead';
import withSpinner from './withSpinner';

let TableContainer = styled.div`
`;

class PeopleTable extends Component {
  componentWillMount() {
    const { fetching, fetchPeople } = this.props;

    if (!fetching) {
      fetchPeople();
    }
  }

  handleChangePage = (event, page) => {
    const internalPage = page + 1;

    this.props.changePage(internalPage);
  };

  handleClick = (event, url) => {
    this.props.fetchPerson(url);
  };

  render() {
    const { personId, people, peopleCount, page, perPage } = this.props;

    const zeroIndexPage = page - 1;

    if (personId) {
      return <Redirect to={`/person/${personId}`} />;
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
          rowsPerPage={perPage}
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
    // Display the spinner on initial load or when transitioning
    // to the detail page
    fetching: state.people.fetching || state.person.fetching,
    personId: state.person.id,
    people: state.people.data,
    peopleCount: state.people.count,
    page: state.page.index,
    perPage: state.page.perPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPerson: (url) => { dispatch(fetchPerson(url)) },
    fetchPeople: () => { dispatch(fetchPeople()) },
    changePage: (page) => { dispatch(changePage(page)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSpinner(PeopleTable));