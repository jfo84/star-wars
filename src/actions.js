import axios from 'axios';

import * as actionTypes from './actionTypes';

const PEOPLE_URL = 'https://swapi.co/api/people/';

const requestPeople = () => {
  return {
    type: actionTypes.REQUEST_PEOPLE,
    payload: {
      fetchingPeople: true
    }
  };
};

const receivePeople = (response, page) => {
  return {
    type: actionTypes.RECEIVE_PEOPLE,
    payload: {
      fetchingPeople: false,
      people: response.data.results,
      peopleCount: response.data.count,
      page: page
    }
  };
};

const populatePeople = (people) => {
  return {
    type: actionTypes.POPULATE_PEOPLE,
    payload: {
      people
    }
  };
};

export const fetchPeople = () => {
  return (dispatch, getState) => {
    const { page, peopleCache } = getState();
    const cachedPeople = peopleCache[page];
    // If we hit the cache, trigger a state change
    // be re-populating people and don't fetch
    if (cachedPeople) {
      dispatch(populatePeople(cachedPeople));
      return;
    }

    dispatch(requestPeople());

    const options = {};
    
    return axios.get(`${PEOPLE_URL}?page=${page}`, options).then((response) => {
      dispatch(receivePeople(response, page));
    });
  }
};

const requestPerson = (url) => {
  return {
    type: actionTypes.REQUEST_PERSON,
    payload: {
      fetchingPerson: true,
      url
    }
  };
};

const receivePerson = (response) => {
  return {
    type: actionTypes.RECEIVE_PERSON,
    payload: {
      fetchingPerson: false,
      person: response.data
    }
  };
};

export const fetchPerson = (url) => {
  return (dispatch) => {
    dispatch(requestPerson(url));

    const options = {};
    
    return axios.get(url, options).then((response) => {
      dispatch(receivePerson(response));
    });
  }
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_PAGE,
      page
    });
    dispatch(fetchPeople());
  }
};