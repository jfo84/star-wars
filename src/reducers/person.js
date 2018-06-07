import * as actionTypes from '.././actionTypes';

const initialState = {
  fetching: false,
  data: {},
  id: null
};

const person = (state = initialState, action) => {
  const payload = action.payload;

  switch(action.type) {
    case(actionTypes.REQUEST_PERSON):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.RECEIVE_PERSON):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.REMOVE_PERSON):
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export default person;