import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const fetchAllProjectNames = () =>
  axios.get('/getAllProjectNames').then(({ data }) => data.data);

const fetchProject = (_id) =>
  axios.get(`/getProject/${_id}`).then(({ data }) => data.data);

const addTranslation = ({ _id, key, locale, translation }) =>
  axios.post(`/addTranslation/${_id}/${locale}/${key}`, {
    translation: translation,
  });

export { fetchProject, fetchAllProjectNames, addTranslation };
