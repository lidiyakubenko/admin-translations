import t from './actionTypes';

const setProject = (data) => ({ type: t.SET_PROJECT, data });
const setProjects = (data) => ({ type: t.SET_PROJECTS, data });

export { setProject, setProjects };
