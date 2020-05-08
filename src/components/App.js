import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { setProject, setProjects } from '../actions/projects';
import { fetchProject, fetchAllProjectNames } from '../api/projects';
import Translations from './Translations';

const App = ({ projects, setProject, setProjects }) => {
  React.useEffect(() => {
    async function fetchData() {
      const projects = await fetchAllProjectNames();
      const project = await fetchProject('5eaa969fdaf47c1e24bb10db');
      setProjects(projects);
      setProject(project);
    }
    fetchData();
  }, []);

  return (
    <div>
      {projects.map((project, i) =>
        project.translations ? <Translations key={i} project={project} /> : null,
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => ({
  setProjects: (data) => {
    dispatch(setProjects(data));
  },
  setProject: (data) => {
    dispatch(setProject(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
