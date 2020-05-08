import { combineReducers, createStore } from 'redux';

import projects from '../reducers/projects';

const app = combineReducers({
  projects,
});

const store = createStore(app);

export default store