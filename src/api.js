import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const addProject = (name) =>
  axios.post('/addProject', {
    value: name,
  });

const deleteProject = (_id) =>
  axios.delete(`/deleteProject/${_id}`);

const fetchAllProjectNames = () =>
  axios.get('/getAllProjectNames').then(({ data }) => data.data);

const fetchProject = (_id) =>
  axios.get(`/getProject/${_id}`).then(({ data }) => data.data);

const addTranslation = ({ _id, key, locale, translation }) =>
  axios.post(`/addTranslation/${_id}/${locale}/${key}`, {
    value: translation,
  });

const addKeyTranslation = ({ _id, key }) =>
  axios.post(`/addKeyTranslation/${_id}`, {
    value: key,
  });

const deleteKeyTranslation = ({ _id, key }) =>
  axios.delete(`/deleteKeyTranslation/${_id}/${key}`);

export {
  addProject,
  fetchProject,
  deleteProject,
  addTranslation,
  addKeyTranslation,
  fetchAllProjectNames,
  deleteKeyTranslation,
};
