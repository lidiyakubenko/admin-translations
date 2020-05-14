import t from './actionTypes';

const setProject = (data) => ({ type: t.SET_PROJECT, data });
const setProjects = (data) => ({ type: t.SET_PROJECTS, data });

const updateTransl = ({ key, locale, translation, _id }) => ({
  type: t.UPDATE_TRANSLATION,
  _id,
  key,
  locale,
  translation,
});

const addKeyTransl = ({ key, _id }) => ({
  type: t.ADD_KEY_TRANSLATION,
  _id,
  key,
});

const deleteKeyTransl = ({ key, _id }) => ({
  type: t.DELETE_KEY_TRANSLATION,
  _id,
  key,
});

export { setProject, setProjects, updateTransl, addKeyTransl, deleteKeyTransl };
