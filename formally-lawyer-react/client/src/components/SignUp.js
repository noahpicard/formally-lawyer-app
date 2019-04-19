import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/es/FormControl/FormControl'
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel'
import Input from '@material-ui/core/es/Input/Input'
import withStyles from '@material-ui/core/es/styles/withStyles'


import { connect } from 'react-redux';
import { redirect } from '../actions/redirect';
import { storeUser } from '../actions/storeUser'



const styles = theme => ({
  error: {
    color: "red",
  },

});


class SignUp extends React.Component {
  state = { toHome: false,
    firstName: '', lastName: '', email: '', password: '', confPassword: '', phone: '', error: false, errorMsg: '', redirect: false,
  };

  handleChange = name => (event) => {
    if (this.state.errorMsg !== '') {
      this.setState({ errorMsg: ''})
    }
    this.setState({ [name]: event.target.value });
  };

  signUp = async e => {
    e.preventDefault();
    const { password, confPassword } = this.state;

    if (password !== confPassword) {
      this.setState({ errorMsg: "Passwords do not Match."})
    }


    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: this.state.firstName,
                             lastName: this.state.lastName,
                             email: this.state.email,
                             password: this.state.password,
                             phone: this.state.phone,}),
    });
    const body = await response.json();
    if ("error" in body) {
      this.setState({ errorMsg: "An account already exists with this email."})
      return false;
    }
    else if ("firstName" in body) {
      console.log(body);
      this.props.storeUser(body);
      this.props.redirect();
    }
    return false;
  };


  render() {
    const { classes } = this.props;



    return (

      <div>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={this.signUp}>
          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input id="firstName" name="firstName" autoComplete="firstName" onChange={this.handleChange('firstName')} autoFocus />
          </FormControl>

          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input id="lastName" name="lastName" autoComplete="lastName" onChange={this.handleChange('lastName')}  />
          </FormControl>

          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" onChange={this.handleChange('email')}  />
          </FormControl>

          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange('password')} />
          </FormControl>

          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange('confPassword')} />
          </FormControl>

          <FormControl margin="normal" fullWidth >
            <InputLabel htmlFor="phone">Phone Number (optional)</InputLabel>
            <Input id="phone" name="phone" autoComplete="phone" onChange={this.handleChange('phone')}  />
          </FormControl>
          <Typography className={classes.error}> {this.state.errorMsg} </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(redirect()),
  storeUser: string => dispatch(storeUser(string))
})


const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));