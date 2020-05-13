import React from 'react';
import { connect } from 'react-redux';
import { setProject, setProjects } from '../redux/actions';
import { fetchProject, fetchAllProjectNames } from '../api';
import Translations from './Translations';
import Menu from './Menu';

const App = ({ projects, setProject, setProjects }) => {
  React.useEffect(() => {
    async function fetchData() {
      const projects = await fetchAllProjectNames();
      const project = await fetchProject(projects[0]._id);
      setProjects(projects);
      setProject(project);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Menu projects={projects}/>
      {projects.map((project, i) =>
        project.isSelected ? <Translations key={i} project={project} /> : null,
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
