import * as actionTypes from '.././actionTypes';

const initialState = {
  index: 1,
  perPage: 10
};

const page = (state = initialState, action) => {
  switch(action.type) {
    case(actionTypes.CHANGE_PAGE):
      return {
        ...state,
        index: action.index
      };
    default:
      return state;
  }
}

export default page;