import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/es/FormControl/FormControl'
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel'
import Input from '@material-ui/core/es/Input/Input'

// const styles = theme => ({
//   paper: {
//     position: 'absolute',
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4,
//     outline: 'none',
//   },
//
// });


class SignUp extends React.Component {
  state = {
    firstName: '', lastName: '', email: '', password: '', confPassword: '', phone: '', error: false, errorMsg: '', redirect: false,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  // function called when signin form is non empty
  // and the sign in button is clicked/pressed
  onSubmit = (e) => {
    // prevents making an HTTP req with email & password in url
    e.preventDefault();
    const { email, password } = this.state;
    // this.signIn(email, password);
  }


  render() {

    return (
      <div>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={this.onSubmit}>

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


export default SignUp;