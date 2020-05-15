import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import {
  setProject,
  deleteProject as deleteProj,
  addNewProject,
} from '../redux/actions';
import { addProject, deleteProject, fetchProject } from '../api';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  addButton: {
    minWidth: 30,
    padding: '6px 12px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

const initialInputState = {
  value: '',
  error: false,
  label: 'Create project',
};

const Menu = ({ addNewProject, setProject, deleteProj, projects }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputState, setInputState] = React.useState(initialInputState);

  const onChangeInput = (e) => {
    const { value } = e.target;

    if (value === '') {
      setInputState({ error: true, label: 'Required input*', value });
    } else {
      setInputState({ ...initialInputState, value });
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const selectProject = (_id) => {
    const fetchData = async () => {
      const project = await fetchProject(_id);
      setProject(project);
    };
    fetchData();
  };

  const createProject = async (e) => {
    e.preventDefault();
    const { value } = inputState;

    if (value === '') {
      setInputState({ error: true, label: 'Required input*', value });
    } else {
      const result = await addProject(value);

      if (result.data.code === 'success') {
        setInputState(initialInputState);
        addNewProject(result.data.data);
      }
    }
  };

  const removeProject = async (e, _id) => {
    e.stopPropagation();
    const result = await deleteProject(_id);

    if (result.data.code === 'success') {
      deleteProj({ _id });
    }
  };

  const list = () => (
    <div className={clsx(classes.list)} role="presentation">
      <List>
        <ListItem>
          <ListItemText primary="Projects" />
        </ListItem>
        <Divider />
        <ListItem>
          <div className={clsx(classes.inputContainer)}>
            <TextField
              {...inputState}
              onChange={onChangeInput}
              id="input_create_project"
            />
            <Button
              color="primary"
              variant="contained"
              onClick={createProject}
              disabled={inputState.error}
              className={clsx(classes.addButton)}
            >
              <AddIcon />
            </Button>
          </div>
        </ListItem>
      </List>
      <List>
        {projects.map(({ name, _id }) => (
          <ListItem button key={_id} onClick={() => selectProject(_id)}>
            <ListItemText primary={name} />
            <Button onClick={(e) => removeProject(e, _id)}>delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>Menu</Button>
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setProject: (data) => {
    dispatch(setProject(data));
  },
  deleteProj: (data) => {
    dispatch(deleteProj(data));
  },
  addNewProject: (data) => {
    dispatch(addNewProject(data));
  },
});

export default connect(() => ({}), mapDispatchToProps)(Menu);
