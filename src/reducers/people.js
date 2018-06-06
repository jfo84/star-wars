import * as actionTypes from '.././actionTypes';

const initialState = {
  fetching: false,
  data: [],
  cache: {},
  count: 10
};

const people = (state = initialState, action) => {
  const payload = action.payload;

  switch(action.type) {
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
      const { page, fetching, data, count } = payload;
      const cache = Object.assign({}, state.cache);

      cache[page] = data;

      return {
        ...state,
        fetching,
        data,
        count,
        cache
      };
    default:
      return state;
  }
}

export default people;