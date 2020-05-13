import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { setProject } from '../redux/actions';
import { fetchProject } from '../api';
import { connect } from 'react-redux';

const Menu = ({ setProject, projects }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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

  const list = () => (
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemText primary="Projects" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {projects.map(({ name, _id }) => (
          <ListItem button key={_id} onClick={() => selectProject(_id)}>
            <ListItemText primary={name} />
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
});

export default connect(() => ({}), mapDispatchToProps)(Menu);
