import * as actionTypes from './actionTypes';

const initialState = {
  fetchingPeople: false, 
  fetchingPerson: false,
  personId: null,
  people: [],
  peopleCache: {},
  peopleCount: 10,
  page: 1,
  perPage: 10
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch(action.type) {
    case(actionTypes.REQUEST_PERSON):
    const { fetchingPerson, url } = payload;
    // We don't have ID's so we strip the ID off the end of the URL
    const personId = url.split('/').filter(segment => segment !== "")[0];

    return {
      ...state,
      fetchingPerson,
      personId
    };
    case(actionTypes.RECEIVE_PERSON):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.REQUEST_PEOPLE):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.POPULATE_PEOPLE):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.RECEIVE_PEOPLE):
      const { page, fetchingPeople, people , peopleCount } = payload;
      const peopleCache = Object.assign({}, state.peopleCache);

      peopleCache[page] = people;

      return {
        ...state,
        fetchingPeople,
        people,
        peopleCount,
        peopleCache
      };
    case(actionTypes.CHANGE_PAGE):
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
}

export default reducer;