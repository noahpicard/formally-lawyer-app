import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/es/FormControl/FormControl'
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel'
import Input from '@material-ui/core/es/Input/Input'
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel'
import Checkbox from '@material-ui/core/es/Checkbox/Checkbox';
import { storeUser } from '../actions/storeUser'
import { redirect } from '../actions/redirect'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/es/styles/index'

const styles = theme => ({
  error: {
    color: "red",
  },

});

class SignIn extends React.Component {
  state = {
    email: '', password: '', error: false, errorMsg: '', redirect: false,
  };




   test = async e => {
        console.log("SENDING")
        const response = await fetch('/api/forms/display', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id:"1"}),
        });
        const body = await response.json();
        console.log(body);
        if ("error" in body) {
            console.log(body);

        }

        else {
            console.log(body);
        }

    };




  signIn = async e => {
    e.preventDefault();
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.state.email, password: this.state.password }),
    });
    const body = await response.json();
    console.log(body);
    if ("error" in body) {
      console.log(body);
      this.setState({ errorMsg: body.error})

      return false;
    }
    else if ("first_name" in body) {
      this.props.storeUser(body);
      this.props.redirect();
    }
    else {
      console.log(body);
    }

    return false;
  };


  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };


  render() {
    const { classes } = this.props;
    this.test();
    return (
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form  onSubmit={this.signIn}>
          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" onChange={this.handleChange('email')} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange('password')} />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Typography className={classes.error}> {this.state.errorMsg} </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(redirect()),
  storeUser: string => dispatch(storeUser(string))
})


const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));