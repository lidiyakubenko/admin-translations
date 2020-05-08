import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const fetchAllProjectNames = () =>
  axios.get('/getAllProjectNames').then(({ data }) => data.data);

const fetchProject = (id) =>
  axios.get(`/getProject/${id}`).then(({ data }) => data.data);

export { fetchProject, fetchAllProjectNames };
