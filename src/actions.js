import axios from 'axios';
import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';

const PEOPLE_URL = 'https://swapi.co/api/people/';

const requestPeople = () => {
  return {
    type: actionTypes.REQUEST_PEOPLE,
    payload: {
      fetching: true
    }
  };
};

const receivePeople = (response, page) => {
  return {
    type: actionTypes.RECEIVE_PEOPLE,
    payload: {
      fetching: false,
      data: response.data.results,
      count: response.data.count,
      page: page
    }
  };
};

const populatePeople = (people) => {
  return {
    type: actionTypes.POPULATE_PEOPLE,
    payload: {
      data: people
    }
  };
};

export const fetchPeople = () => {
  return (dispatch, getState) => {
    const { page, people } = getState();
    const cachedPeople = people.cache[page.index];
    // If we hit the cache, trigger a state change
    // be re-populating people and don't fetch
    if (cachedPeople) {
      dispatch(populatePeople(cachedPeople));
      return;
    }

    dispatch(requestPeople());

    const options = {};
    
    return axios.get(`${PEOPLE_URL}?page=${page.index}`, options).then((response) => {
      dispatch(receivePeople(response, page));
    });
  }
};

const requestPerson = (url) => {
  return {
    type: actionTypes.REQUEST_PERSON,
    payload: {
      fetching: true,
      url
    }
  };
};

const receivePerson = (response) => {
  return {
    type: actionTypes.RECEIVE_PERSON,
    payload: {
      fetching: false,
      data: response.data
    }
  };
};

export const fetchPerson = (url) => {
  return (dispatch) => {
    dispatch(requestPerson(url));

    const options = {};

    return axios.get(url, options).then((response) => {
      // We don't have ID's so we strip the ID off the end of the URL
      const segments = url.split('/').filter(segment => segment !== "");
      const personId = segments[segments.length - 1];

      dispatch(receivePerson(response));
      dispatch(push(`/person/${personId}`));
    });
  }
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_PAGE,
      index: page
    });
    dispatch(fetchPeople());
  }
};