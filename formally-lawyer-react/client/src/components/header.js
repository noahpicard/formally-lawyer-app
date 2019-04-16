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
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/es/Paper/Paper'
import Avatar from '@material-ui/core/es/Avatar/Avatar'
import FormControl from '@material-ui/core/es/FormControl/FormControl'
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel'
import Input from '@material-ui/core/es/Input/Input'
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@material-ui/core/es/Checkbox/Checkbox';
import SignUp from './SignUp';
import SignIn from './SignIn';

const styles = theme => ({
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
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  buttonModal: {
    padding: 0,
    color: "black"
  },

});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class ButtonAppBar extends React.Component {
  state = {
    open: false,
    signUpSignIn: true,
    email: '', password: '', error: false, errorMsg: '', redirect: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  changeLogin = () => {
    this.setState({ signUpSignIn: !this.state.signUpSignIn })
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;
    const { signUpSignIn } = this.state;


    const signUp = (<div>
                      <SignUp />
                      Have an Account?
                      <Button size="small" onClick={this.changeLogin} className={classes.buttonModal}>Sign In</Button>
                    </div>
                    );

    const signIn = (<div>
                      <SignIn />
                      Need an Account?
                      <Button size="small" onClick={this.changeLogin} className={classes.buttonModal}>Sign Up</Button>
                    </div>
                  );


    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <img src={logo} className={classes.img}/>
            <div className={classes.buttons}>
              <Button color="secondary" onClick={this.handleOpen} className={classes.button}>Sign In or Sign Up</Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
              >
                <div style={getModalStyle()} className={classes.paper}>

                  {signUpSignIn ? signIn : signUp}

                </div>
              </Modal>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);