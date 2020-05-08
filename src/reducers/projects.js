import t from '../actions/actionTypes';

const project = (state = {}, action) => {
  switch (action.type) {
    case t.SET_PROJECT:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

const projects = (state = [], action) => {
  switch (action.type) {
    case t.SET_PROJECT:
      return state.map((item) =>
        item._id === action.data._id ? project(item, action) : item,
      );
    case t.SET_PROJECTS:
      return [...state, ...action.data];
    default:
      return state;
  }
};

export default projects;
