import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../Logo.png';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bar: {
    backgroundColor: "#01BABB",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    fontSize: "large",
    marginLeft: "5%",
    marginRight: "5%",
  },
  img: {
    marginLeft: "1%",
  }

};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <img src={logo} className={classes.img}/>
          <div className={classes.buttons}>
            <Button color="secondary" className={classes.button}>Home</Button>
            <Button color="secondary" className={classes.button}>Mission</Button>
            <Button color="secondary" className={classes.button}>Team</Button>
            <Button color="secondary" className={classes.button}>About</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);